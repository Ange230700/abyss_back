// src\furniture\furniture.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFurnitureDto } from '~/src/furniture/dto/create-furniture.dto';
import { UpdateFurnitureDto } from '~/src/furniture/dto/update-furniture.dto';
import { furniture } from '@prisma/client';

@Injectable()
export class FurnitureService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFurnitureDto): Promise<furniture> {
    return this.prisma.furniture.create({ data });
  }

  findAll(): Promise<furniture[]> {
    return this.prisma.furniture.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number): Promise<furniture | null> {
    return this.prisma.furniture.findUnique({
      where: { id, deleted_at: null },
    });
  }

  update(id: number, data: UpdateFurnitureDto): Promise<furniture> {
    return this.prisma.furniture.update({ where: { id }, data });
  }

  remove(id: number): Promise<furniture> {
    return this.prisma.furniture.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
