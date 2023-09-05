import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { AUTH_GUARD } from '../guards/jwt.guard';
import { User } from '../decorators/user.decorator';
import { UserInfo } from '@micro/contracts';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('info')
  @AUTH_GUARD()
  async getUserInfo(
    @User() user: UserInfo.Request
  ): Promise<UserInfo.Response> {
    try {
      return await this.rmqService.send<UserInfo.Request, UserInfo.Response>(
        UserInfo.topic,
        user
      );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
