// src\user\user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateUserDto } from '~/src/user/dto/create-user.dto';
import { UpdateUserDto } from '~/src/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id, deleted_at: null } });
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
