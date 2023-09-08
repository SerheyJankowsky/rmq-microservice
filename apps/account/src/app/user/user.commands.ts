import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UpdateUser } from '@micro/contracts';
import { UserEntity, UserRepository } from '@micro/repositories';
import { IUser } from '@micro/interfaces';

@Controller()
export class UserCommands {
  constructor(private readonly userRepository: UserRepository) {}
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
}
