import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import {
  AccountBuyCourse,
  AccountCheckPaymentStatus,
  UpdateUser,
} from '@micro/contracts';
import { UserService } from './user.service';

@Controller()
export class UserCommands {
  constructor(private readonly userService: UserService) {}
  @RMQRoute(UpdateUser.topic)
  async updateUser(
    @Body() user: UpdateUser.Request
  ): Promise<UpdateUser.Response> {
    return this.userService.updateUser(user);
  }

  @RMQRoute(AccountBuyCourse.topic)
  async buyCourse(
    @Body() { userId, courseId }: AccountBuyCourse.Request
  ): Promise<AccountBuyCourse.Response> {
    return this.userService.buyCourse(userId, courseId);
  }

  @RMQRoute(AccountCheckPaymentStatus.topic)
  async checkPayment(
    @Body() { userId, courseId }: AccountCheckPaymentStatus.Request
  ): Promise<AccountCheckPaymentStatus.Response> {
    return this.userService.checkPayment(userId, courseId);
  }
}
