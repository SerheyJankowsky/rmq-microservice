import { UserRepository } from '@micro/repositories';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueries } from './user.queries';
import { UserCommands } from './user.commands';

@Module({
  providers: [UserRepository, UserService],
  exports: [],
  controllers: [UserQueries, UserCommands],
  imports: [],
})
export class UserModule {}
