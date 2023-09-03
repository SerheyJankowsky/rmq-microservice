import { PrismaService } from '@micro/database';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: UserEntity): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password as string,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
    return newUser;
  }

  async findUser(identifier: string): Promise<User | unknown> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ id: identifier }, { email: identifier }],
      },
    });
    return user;
  }

  async deleteUser(id: string): Promise<User | unknown> {
    const user = await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async updateUser(user: Partial<User>): Promise<User | unknown> {
    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
    return updateUser;
  }
}
