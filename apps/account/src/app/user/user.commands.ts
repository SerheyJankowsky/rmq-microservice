import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQService } from 'nestjs-rmq';
import {
  AccountBuyCourse,
  AccountCheckPaymentStatus,
  UpdateUser,
} from '@micro/contracts';
import { UserEntity, UserRepository } from '@micro/repositories';
import { IUser } from '@micro/interfaces';
import { BuyCourseSaga } from './sagas/buy-course.saga';

@Controller()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService
  ) {}
  @RMQRoute(UpdateUser.topic)
  async updateUser(
    @Body() user: UpdateUser.Request
  ): Promise<UpdateUser.Response> {
    const userExist = (await this.userRepository.findUser(user.id)) as IUser;
    if (!userExist) {
      throw new Error('User doesnt exist');
    }
    const userEntity = new UserEntity(userExist).update(user);
    await this.userRepository.updateUser(userEntity);
    return { user: userEntity };
  }

  @RMQRoute(AccountBuyCourse.topic)
  async buyCourse(
    @Body() { userId, courseId }: AccountBuyCourse.Request
  ): Promise<AccountBuyCourse.Response> {
    const existUser = (await this.userRepository.findUser(userId)) as IUser;
    if (!existUser) {
      throw new Error('user not found');
    }
    const userEntity = new UserEntity(existUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, paymentLink } = await saga.state.pay();
    await this.userRepository.updateUser(user);
    return { paymentLink };
  }

  @RMQRoute(AccountCheckPaymentStatus.topic)
  async checkPayment(
    @Body() { userId, courseId }: AccountCheckPaymentStatus.Request
  ): Promise<AccountCheckPaymentStatus.Response> {
    const existUser = (await this.userRepository.findUser(userId)) as IUser;
    if (!existUser) {
      throw new Error('user not found');
    }
    const userEntity = new UserEntity(existUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, status } = await saga.state.checkPayment();
    await this.userRepository.updateUser(user);
    return { status };
  }
}
