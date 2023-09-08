import { UserRepository } from '@micro/repositories';
import { Module } from '@nestjs/common';
import { UserQueries } from './user.queries';
import { UserCommands } from './user.commands';

@Module({
  providers: [UserRepository],
  exports: [],
  controllers: [UserQueries, UserCommands],
  imports: [],
})
export class UserModule {}
