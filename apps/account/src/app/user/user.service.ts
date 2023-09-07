import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@micro/repositories';
import { UserInfo } from '@micro/contracts';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getInfo(id: string): Promise<UserEntity> {
    const user = (await this.userRepository.findUser(id)) as UserInfo.Response;
    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.BAD_REQUEST);
    }
    return new UserEntity({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      id: user.id,
    });
  }
}
