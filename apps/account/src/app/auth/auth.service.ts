import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@micro/repositories';
import { Role } from '@prisma/client';
import { IUser, IUserOmit } from '@micro/interfaces';
import { JwtService } from '@nestjs/jwt';
import { AccountRegister } from '@micro/contracts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  async register(dto: AccountRegister.Request): Promise<IUserOmit> {
    const exist = await this.userRepository.findUser(dto.email);
    if (exist) {
      throw new HttpException('User is registered', HttpStatus.CONFLICT);
    }
    const newUser: UserEntity = new UserEntity({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      role: [Role.BAYER, Role.SELLER],
      subscription: undefined,
      username: dto.username,
    });
    await newUser.hashPassword(dto.password);
    const user: IUser = await this.userRepository.createUser(newUser);
    delete user['password'];
    return user;
  }

  async validateUser(email: string, password: string): Promise<IUserOmit> {
    const exist: IUser = (await this.userRepository.findUser(email)) as IUser;
    if (!exist) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
    const userEntity = new UserEntity(exist);
    const isValidPassword = await userEntity.validatePassword(password);
    if (!isValidPassword) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const executeFields = { ...exist };
    delete executeFields['password'];
    return executeFields;
  }
  async login(user: IUserOmit) {
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
