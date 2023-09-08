import { UserEntity } from '@micro/repositories';
import { RMQService } from 'nestjs-rmq';
import { PurchaseState } from '@micro/interfaces';
import { BuyCourseState } from './buy-course.state';

export class BuyCourseSaga {
  private _state: BuyCourseState;
  constructor(
    private user: UserEntity,
    private courseId: string,
    private rmqService: RMQService
  ) {}

  get state() {
    return this._state;
  }

  setState(state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started:
        break;
      case PurchaseState.Waiting:
        break;
      case PurchaseState.Done:
        break;
      case PurchaseState.Canceled:
        break;
    }
    //set context
    this._state.saga = this;
    this.user.updateCourseStatus(this.courseId, state);
  }
}
