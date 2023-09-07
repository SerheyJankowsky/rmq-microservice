import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { RMQRoute } from 'nestjs-rmq';
import { UserInfo } from '@micro/contracts';
import { UserCourses } from '../../../../../libs/contracts/src/lib/account';

@Controller()
export class UserQueries {
  constructor(private readonly userService: UserService) {}
  @RMQRoute(UserInfo.topic)
  async getUserInfo(@Body() dto: UserInfo.Request): Promise<UserInfo.Response> {
    const user = await this.userService.getInfo(dto.id);
    return user as UserInfo.Response;
  }

  @RMQRoute(UserCourses.topic)
  async getUserCourses(
    @Body() dto: UserCourses.Request
  ): Promise<UserCourses.Response> {
    const user = await this.userService.getInfo(dto.id);
    return { courses: user.courses };
  }
}
