// src\furnituretype\furnituretype.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFurnituretypeDto } from '~/src/furnituretype/dto/create-furnituretype.dto';
import { UpdateFurnituretypeDto } from '~/src/furnituretype/dto/update-furnituretype.dto';
import { furnituretype } from '@prisma/client';

@Injectable()
export class FurnituretypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFurnituretypeDto): Promise<furnituretype> {
    return this.prisma.furnituretype.create({ data });
  }

  findAll(): Promise<furnituretype[]> {
    return this.prisma.furnituretype.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number): Promise<furnituretype | null> {
    return this.prisma.furnituretype.findUnique({
      where: { id, deleted_at: null },
    });
  }

  update(id: number, data: UpdateFurnituretypeDto): Promise<furnituretype> {
    return this.prisma.furnituretype.update({ where: { id }, data });
  }

  remove(id: number): Promise<furnituretype> {
    return this.prisma.furnituretype.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
