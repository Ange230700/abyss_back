// src\furniturematerial\furniturematerial.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFurniturematerialDto } from '~/src/furniturematerial/dto/create-furniturematerial.dto';
import { UpdateFurniturematerialDto } from '~/src/furniturematerial/dto/update-furniturematerial.dto';
import { furniturematerial } from '@prisma/client';

@Injectable()
export class FurniturematerialService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFurniturematerialDto): Promise<furniturematerial> {
    return this.prisma.furniturematerial.create({ data });
  }

  findAll(): Promise<furniturematerial[]> {
    return this.prisma.furniturematerial.findMany({
      where: { deleted_at: null },
      include: {
        furniture: true,
        material: true,
      },
    });
  }

  findOne(id: number): Promise<furniturematerial | null> {
    return this.prisma.furniturematerial.findUnique({
      where: { id, deleted_at: null },
    });
  }

  update(
    id: number,
    data: UpdateFurniturematerialDto,
  ): Promise<furniturematerial> {
    return this.prisma.furniturematerial.update({ where: { id }, data });
  }

  remove(id: number): Promise<furniturematerial> {
    return this.prisma.furniturematerial.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
