// src\user\user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateUserDto } from '~/src/user/dto/create-user.dto';
import { UpdateUserDto } from '~/src/user/dto/update-user.dto';
import { user } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<user> {
    const hashedPassword = await argon2.hash(data.password);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  findAll(): Promise<user[]> {
    return this.prisma.user.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number): Promise<user | null> {
    return this.prisma.user.findUnique({ where: { id, deleted_at: null } });
  }

  async update(id: number, data: UpdateUserDto): Promise<user> {
    let updateData: UpdateUserDto = { ...data };
    if (data.password) {
      updateData.password = await argon2.hash(data.password);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: number): Promise<user> {
    return this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
