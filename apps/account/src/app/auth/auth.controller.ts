import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserOmit } from '@micro/interfaces';
import { AccountLogin, AccountRegister } from '@micro/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @RMQRoute(AccountRegister.topic)
  async register(
    @Body() dto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    const user: IUserOmit = await this.authService.register(dto);
    return this.authService.login(user);
  }

  @RMQRoute(AccountLogin.topic)
  async login(
    @Body() { password, email }: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const user: IUserOmit = await this.authService.validateUser(
      email,
      password
    );
    return this.authService.login(user);
  }
}
