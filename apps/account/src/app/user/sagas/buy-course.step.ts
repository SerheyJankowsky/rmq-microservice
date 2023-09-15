import { BuyCourseState } from './buy-course.state';
import { UserEntity } from '@micro/repositories';
import {
  CourseGetCourse,
  PaymentCheck,
  PaymentGenerateLink,
  statusType,
} from '@micro/contracts';
import { PurchaseState } from '@micro/interfaces';

export class BuyCourseSagaStateStarted extends BuyCourseState {
  async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
    return {
      user: this.saga.user,
    };
  }

  checkPayment(): Promise<{ user: UserEntity; status: statusType }> {
    throw new Error('Methods not implemented');
  }

  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    const { course } = await this.saga.rmqService.send<
      CourseGetCourse.Request,
      CourseGetCourse.Response
    >(CourseGetCourse.topic, {
      id: this.saga.courseId,
    });
    if (!course) {
      throw new Error('This course not found');
    }
    if (course.price === 0) {
      this.saga.setState(PurchaseState.Done, course.id);
      return {
        paymentLink: null,
        user: this.saga.user,
      };
    }
    const { link } = await this.saga.rmqService.send<
      PaymentGenerateLink.Request,
      PaymentGenerateLink.Response
    >(PaymentGenerateLink.topic, {
      courseId: course.id,
      sum: course.price,
      userId: this.saga.user.id,
    });
    this.saga.setState(PurchaseState.Waiting, course.id);
    return {
      user: this.saga.user,
      paymentLink: link,
    };
  }
}

export class BuyCourseSagaStateProcess extends BuyCourseState {
  async cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Payment in process end cant canceled from this state');
  }

  async checkPayment(): Promise<{ user: UserEntity; status: statusType }> {
    const { status } = await this.saga.rmqService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      userId: this.saga.user.id,
      courseId: this.saga.courseId,
    });
    if (status === 'cancel') {
      this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
      return {
        user: this.saga.user,
        status: 'cancel',
      };
    }
    if (status !== 'success') {
      return {
        user: this.saga.user,
        status: 'success',
      };
    }
    this.saga.setState(PurchaseState.Done, this.saga.courseId);
    return {
      user: this.saga.user,
      status: 'progress',
    };
  }

  pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error('Methods is not valid for this step');
  }
}

export class BuyCourseSagaStateDone extends BuyCourseState {
  cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Payment in process end cant canceled from this state');
  }

  checkPayment(): Promise<{ user: UserEntity; status: statusType }> {
    throw new Error('Cant check payed');
  }

  pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error('Methods is not valid for this step');
  }
}

export class BuyCourseSagaStateCanceled extends BuyCourseState {
  cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Payment in process end cant canceled from this state');
  }

  async checkPayment(): Promise<{ user: UserEntity; status: statusType }> {
    throw new Error('Cant check payed');
  }

  async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    this.saga.setState(PurchaseState.Started, this.saga.courseId);
    return this.saga.state.pay();
  }
}
