import { UserEntity } from '@micro/repositories';
import { RMQService } from 'nestjs-rmq';
import { PurchaseState } from '@micro/interfaces';
import { BuyCourseState } from './buy-course.state';
import {
  BuyCourseSagaStateCanceled,
  BuyCourseSagaStateDone,
  BuyCourseSagaStateProcess,
  BuyCourseSagaStateStarted,
} from './buy-course.step';

export class BuyCourseSaga {
  private _state: BuyCourseState;
  constructor(
    public user: UserEntity,
    public courseId: string,
    public rmqService: RMQService
  ) {}

  get state() {
    return this._state;
  }

  setState(state: PurchaseState, id: string) {
    switch (state) {
      case PurchaseState.Started:
        this._state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.Waiting:
        this._state = new BuyCourseSagaStateProcess();
        break;
      case PurchaseState.Done:
        this._state = new BuyCourseSagaStateDone();
        break;
      case PurchaseState.Canceled:
        this._state = new BuyCourseSagaStateCanceled();
        break;
    }
    //set context
    this._state.saga = this;
    this.user.setCourseStatus(id, state);
  }
}
