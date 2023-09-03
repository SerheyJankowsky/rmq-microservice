import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../configs/jwt.config';
import { UserRepository } from '@micro/repositories';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  imports: [JwtModule.registerAsync(jwtConfig())],
  exports: [],
})
export class AuthModule {}
