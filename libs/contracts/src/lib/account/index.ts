import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

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
