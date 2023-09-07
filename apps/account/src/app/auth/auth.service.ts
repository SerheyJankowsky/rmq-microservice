import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@micro/repositories';
import { Role } from '@prisma/client';
import { IUser, UserId } from '@micro/interfaces';
import { JwtService } from '@nestjs/jwt';
import { AccountRegister } from '@micro/contracts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  async register(dto: AccountRegister.Request): Promise<UserId> {
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
      username: dto.username,
    });
    await newUser.hashPassword(dto.password);
    const user: IUser = await this.userRepository.createUser(newUser);
    return { id: user.id };
  }

  async validateUser(email: string, password: string): Promise<UserId> {
    const exist: IUser = (await this.userRepository.findUser(email)) as IUser;
    if (!exist) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
    const userEntity = new UserEntity(exist);
    const isValidPassword = await userEntity.validatePassword(password);
    if (!isValidPassword) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { id: userEntity.id };
  }
  async login(user: UserId) {
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
