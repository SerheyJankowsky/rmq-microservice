import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UserCourses, UserInfo } from '@micro/contracts';
import { UserEntity, UserRepository } from '@micro/repositories';
import { IUser } from '@micro/interfaces';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}
  @RMQRoute(UserInfo.topic)
  async getUserInfo(
    @Body() { id }: UserInfo.Request
  ): Promise<UserInfo.Response> {
    const user: IUser | unknown = await this.userRepository.findUser(id);
    if (!user) {
      throw new Error('User doesnt exist');
    }
    const userEntity = new UserEntity(user as IUser);
    return userEntity.getPublicInfo();
  }

  @RMQRoute(UserCourses.topic)
  async getUserCourses(
    @Body() { id }: UserCourses.Request
  ): Promise<UserCourses.Response> {
    const user = (await this.userRepository.findUser(id)) as IUser;
    if (!user) {
      throw new Error('User does not exist');
    }
    const userEntity = new UserEntity(user);
    return { courses: userEntity.getUserCourses() };
  }
}
