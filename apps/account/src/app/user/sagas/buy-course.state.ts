import { BuyCourseSaga } from './buy-course.saga';
import { UserEntity } from '@micro/repositories';
import { PurchaseState } from '@micro/interfaces';
import { statusType } from '@micro/contracts';

export abstract class BuyCourseState {
  private _saga: BuyCourseSaga;

  set saga(saga: BuyCourseSaga) {
    this._saga = saga;
  }

  get saga() {
    return this._saga;
  }

  public abstract pay(): Promise<{ paymentLink: string; user: UserEntity }>;
  public abstract checkPayment(): Promise<{
    user: UserEntity;
    status: statusType;
  }>;
  public abstract cancel(): Promise<{ user: UserEntity }>;
}
