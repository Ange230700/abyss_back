// src\image\image.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateImageDto } from '~/src/image/dto/create-image.dto';
import { UpdateImageDto } from '~/src/image/dto/update-image.dto';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateImageDto) {
    return this.prisma.image.create({ data });
  }

  findAll() {
    return this.prisma.image.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number) {
    return this.prisma.image.findUnique({ where: { id, deleted_at: null } });
  }

  update(id: number, data: UpdateImageDto) {
    return this.prisma.image.update({ where: { id }, data });
  }

  remove(id: number) {
    // Soft delete
    return this.prisma.image.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
