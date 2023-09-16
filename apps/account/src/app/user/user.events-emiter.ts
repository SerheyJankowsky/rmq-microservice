import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '@micro/repositories';

@Injectable()
export class UserEventsEmiter {
  constructor(private readonly rmqService: RMQService) {}

  async emit(user: UserEntity) {
    for (const event of user.events) {
      await this.rmqService.notify(event.topic, event.data);
    }
  }
}
