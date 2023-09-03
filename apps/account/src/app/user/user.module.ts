import { UserRepository } from '@micro/repositories';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserRepository],
  exports: [],
  controllers: [],
  imports: [],
})
export class UserModule {}
