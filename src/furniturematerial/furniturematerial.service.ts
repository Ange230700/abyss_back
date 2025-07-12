// src\furniturematerial\furniturematerial.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFurniturematerialDto } from '~/src/furniturematerial/dto/create-furniturematerial.dto';
import { UpdateFurniturematerialDto } from '~/src/furniturematerial/dto/update-furniturematerial.dto';

@Injectable()
export class FurniturematerialService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFurniturematerialDto) {
    return this.prisma.furniturematerial.create({ data });
  }

  findAll() {
    return this.prisma.furniturematerial.findMany({
      where: { deleted_at: null },
    });
  }

  findOne(id: number) {
    return this.prisma.furniturematerial.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateFurniturematerialDto) {
    return this.prisma.furniturematerial.update({ where: { id }, data });
  }

  remove(id: number) {
    // Soft delete
    return this.prisma.furniturematerial.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
