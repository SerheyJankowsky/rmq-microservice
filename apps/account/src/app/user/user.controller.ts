import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UserInfo } from '@micro/contracts';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @RMQRoute(UserInfo.topic)
  async getUserInfo(@Body() dto: UserInfo.Request): Promise<UserInfo.Response> {
    const user = await this.userService.getInfo(dto.id);
    return user as UserInfo.Response;
  }
}
