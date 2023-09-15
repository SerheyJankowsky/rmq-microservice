import { IUser, IUserCourses, PurchaseState } from '@micro/interfaces';
import { Role } from '@prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
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
  courses: IUserCourses[];

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.role = user?.role ?? [];
    this.courses = user?.courses ?? [];
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  public async hashPassword(password: string): Promise<void> {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
  }

  public async validatePassword(password: string): Promise<boolean | null> {
    if (this.password) {
      return compare(password, this.password);
    }
    return null;
  }

  public setCourseStatus(id: string, state: PurchaseState) {
    const exist = this.courses.find((c) => c.id === id);
    if (!exist) {
      this.courses.push({ id: id, purchaseState: state });
      return this;
    }
    if (state === PurchaseState.Canceled) {
      this.courses = this.courses.filter((c) => c.id !== id);
      return this;
    }
    this.courses = this.courses.map((c) =>
      c.id === id ? { ...c, purchaseState: state } : c
    );
    return this;
  }

  public getPublicInfo(): IUser {
    return {
      email: this.email,
      firstName: this.firstName,
      id: this.id,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      role: this.role,
      username: this.username,
    };
  }

  public update(user: IUser) {
    this.username = user.username;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    return this;
  }

  public getUserCourses(): IUserCourses[] {
    return this.courses;
  }
}
