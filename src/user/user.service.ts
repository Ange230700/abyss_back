// src\user\user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateUserDto } from '~/src/user/dto/create-user.dto';
import { UpdateUserDto } from '~/src/user/dto/update-user.dto';
import { user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto): Promise<user> {
    return this.prisma.user.create({ data });
  }

  findAll(): Promise<user[]> {
    return this.prisma.user.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number): Promise<user | null> {
    return this.prisma.user.findUnique({ where: { id, deleted_at: null } });
  }

  update(id: number, data: UpdateUserDto): Promise<user> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<user> {
    return this.prisma.user.delete({ where: { id } });
  }
}
