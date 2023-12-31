import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IUser, IUserCourses, PurchaseState } from '@micro/interfaces';
import { statusType } from '../payments';

export namespace AccountLogin {
  export const topic = 'account.login.query';

  export class Request {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
  }

  export class Response {
    access_token!: string;
  }
}

export namespace AccountRegister {
  export const topic = 'account.register.command';
  export class Request {
    @IsString()
    username!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber!: string;

    role!: Role[];
  }

  export class Response {
    access_token!: string;
  }
}

export namespace UserInfo {
  export const topic = 'account.info.query';

  export class Request {
    id!: string;
  }

  export class Response implements IUser {
    email!: string;
    firstName!: string;
    id?: string;
    lastName!: string;
    phoneNumber!: string;
    role!: Role[];
    username!: string;
  }
}

export namespace UserCourses {
  export const topic = 'account.courses.query';
  export class Request {
    id!: string;
  }
  export class Response {
    courses!: IUserCourses[];
  }
}

export namespace UpdateUser {
  export const topic = 'account.update_user.command';

  export class Request implements IUser {
    id!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    role!: Role[];
    username!: string;
  }

  export class Response {
    user!: IUser;
  }
}

export namespace AccountBuyCourse {
  export const topic = 'account.buy-course.command';

  export class Request {
    userId!: string;
    courseId!: string;
  }

  export class Response {
    paymentLink!: string;
  }
}

export namespace AccountCheckPaymentStatus {
  export const topic = 'account.check-payment-status.command';

  export class Request {
    userId!: string;
    courseId!: string;
  }

  export class Response {
    status!: statusType;
  }
}

export namespace AccountChangeCourse {
  export const topic = 'account.change-course.event';

  export class Request {
    userId!: string;
    courseId!: string;

    state!: PurchaseState;
  }
}
