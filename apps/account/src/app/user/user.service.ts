import { Body, Injectable } from '@nestjs/common';
import {
  AccountBuyCourse,
  AccountCheckPaymentStatus,
  UpdateUser,
} from '@micro/contracts';
import { IUser } from '@micro/interfaces';
import { UserEntity, UserRepository } from '@micro/repositories';
import { RMQService } from 'nestjs-rmq';
import { BuyCourseSaga } from './sagas/buy-course.saga';
import { UserEventsEmiter } from './user.events-emiter';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService,
    private readonly userEventEmiter: UserEventsEmiter
  ) {}

  public async updateUser(
    user: UpdateUser.Request
  ): Promise<UpdateUser.Response> {
    const userExist = (await this.userRepository.findUser(user.id)) as IUser;
    if (!userExist) {
      throw new Error('User doesnt exist');
    }
    const userEntity = new UserEntity(userExist).update(user);
    await this.changeUser(userEntity);
    return { user: userEntity };
  }

  public async buyCourse(
    userId: string,
    courseId: string
  ): Promise<AccountBuyCourse.Response> {
    const existUser = (await this.userRepository.findUser(userId)) as IUser;
    if (!existUser) {
      throw new Error('user not found');
    }
    const userEntity = new UserEntity(existUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, paymentLink } = await saga.state.pay();
    await this.changeUser(user);
    return { paymentLink };
  }

  public async checkPayment(
    userId: string,
    courseId: string
  ): Promise<AccountCheckPaymentStatus.Response> {
    const existUser = (await this.userRepository.findUser(userId)) as IUser;
    if (!existUser) {
      throw new Error('user not found');
    }
    const userEntity = new UserEntity(existUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, status } = await saga.state.checkPayment();
    await this.changeUser(user);
    return { status };
  }

  private changeUser(user: UserEntity) {
    return Promise.all([
      this.userEventEmiter.emit(user),
      this.userRepository.updateUser(user),
    ]);
  }
}
