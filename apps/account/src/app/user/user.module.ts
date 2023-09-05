import { UserRepository } from '@micro/repositories';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserRepository, UserService],
  exports: [],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}
