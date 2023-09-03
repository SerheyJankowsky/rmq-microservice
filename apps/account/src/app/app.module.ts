import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@micro/database';
import { ConfigModule as Config } from '@nestjs/config/dist/config.module';
import { RMQModule } from 'nestjs-rmq';
import { rqmConfig } from './configs/rmq.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    Config.forRoot({ isGlobal: true, envFilePath: 'envs/.account.env' }),
    RMQModule.forRootAsync(rqmConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
