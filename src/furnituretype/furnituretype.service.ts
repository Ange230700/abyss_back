// src\furnituretype\furnituretype.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFurnituretypeDto } from '~/src/furnituretype/dto/create-furnituretype.dto';
import { UpdateFurnituretypeDto } from '~/src/furnituretype/dto/update-furnituretype.dto';

@Injectable()
export class FurnituretypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFurnituretypeDto) {
    return this.prisma.furnituretype.create({ data });
  }

  findAll() {
    return this.prisma.furnituretype.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number) {
    return this.prisma.furnituretype.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateFurnituretypeDto) {
    return this.prisma.furnituretype.update({ where: { id }, data });
  }

  remove(id: number) {
    // Soft delete
    return this.prisma.furnituretype.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
