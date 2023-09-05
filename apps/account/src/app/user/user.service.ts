import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@micro/repositories';
import { UserInfo } from '@micro/contracts';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getInfo(id: string): Promise<UserInfo.Response> {
    const user = (await this.userRepository.findUser(id)) as UserInfo.Response;
    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
