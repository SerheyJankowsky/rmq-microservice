import { Role } from '@prisma/client';

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: Role[];
  courses?: IUserCourses[];
}

export type UserId = Pick<IUser, 'id'>;
export enum PurchaseState {
  Started = 'Started',
  Waiting = 'Waiting',
  Done = 'Done',
  Canceled = 'Canceled',
}
export interface IUserCourses {
  id: string;
  purchaseState: PurchaseState;
}
