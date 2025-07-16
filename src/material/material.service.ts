// src\material\material.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateMaterialDto } from '~/src/material/dto/create-material.dto';
import { UpdateMaterialDto } from '~/src/material/dto/update-material.dto';
import { material } from '@prisma/client';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMaterialDto): Promise<material> {
    return this.prisma.material.create({ data });
  }

  findAll(): Promise<material[]> {
    return this.prisma.material.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number): Promise<material | null> {
    return this.prisma.material.findUnique({ where: { id, deleted_at: null } });
  }

  update(id: number, data: UpdateMaterialDto): Promise<material> {
    return this.prisma.material.update({ where: { id }, data });
  }

  remove(id: number): Promise<material> {
    return this.prisma.material.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
