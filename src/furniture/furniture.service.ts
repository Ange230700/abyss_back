// src\furniture\furniture.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFurnitureDto } from '~/src/furniture/dto/create-furniture.dto';
import { UpdateFurnitureDto } from '~/src/furniture/dto/update-furniture.dto';

@Injectable()
export class FurnitureService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFurnitureDto) {
    return this.prisma.furniture.create({ data });
  }

  findAll() {
    return this.prisma.furniture.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number) {
    return this.prisma.furniture.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateFurnitureDto) {
    return this.prisma.furniture.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.furniture.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
