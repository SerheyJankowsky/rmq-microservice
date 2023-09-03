import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { rqmConfig } from './config/rmq.config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(rqmConfig()),
    JwtModule.registerAsync(jwtConfig()),
    PassportModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
