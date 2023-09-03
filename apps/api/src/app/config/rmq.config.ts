import { IRMQServiceAsyncOptions } from 'nestjs-rmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const rqmConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (config) => ({
    exchangeName: config.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        login: config.get('AMQP_USER') ?? '',
        password: config.get('AMQP_PASSWORD') ?? '',
        host: config.get('AMQP_HOST_NAME') ?? '',
      },
    ],
    queueName: config.get('AMQP_QUEUE_NAME') ?? '',
    prefetchCount: 32,
    serviceName: 'account',
  }),
});
