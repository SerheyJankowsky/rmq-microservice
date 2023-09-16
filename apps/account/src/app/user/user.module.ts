import { UserRepository } from '@micro/repositories';
import { Module } from '@nestjs/common';
import { UserQueries } from './user.queries';
import { UserCommands } from './user.commands';
import { UserService } from './user.service';
import { UserEventsEmiter } from './user.events-emiter';

@Module({
  providers: [UserRepository, UserService, UserEventsEmiter],
  exports: [],
  controllers: [UserQueries, UserCommands],
  imports: [],
})
export class UserModule {}
