// src\material\material.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateMaterialDto } from '~/src/material/dto/create-material.dto';
import { UpdateMaterialDto } from '~/src/material/dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMaterialDto) {
    return this.prisma.material.create({ data });
  }

  findAll() {
    return this.prisma.material.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number) {
    return this.prisma.material.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateMaterialDto) {
    return this.prisma.material.update({ where: { id }, data });
  }

  remove(id: number) {
    // Soft delete
    return this.prisma.material.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
