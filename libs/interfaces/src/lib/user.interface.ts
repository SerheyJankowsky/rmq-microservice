import { Role, Subscriptions } from '@prisma/client';

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
  subscription?: Subscriptions;
}

export type IUserOmit = Omit<IUser, 'password'>;
