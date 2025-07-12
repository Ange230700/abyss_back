// src\favorite\favorite.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFavoriteDto } from '~/src/favorite/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '~/src/favorite/dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFavoriteDto) {
    return this.prisma.favorite.create({ data });
  }

  findAll() {
    return this.prisma.favorite.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number) {
    return this.prisma.favorite.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateFavoriteDto) {
    return this.prisma.favorite.update({ where: { id }, data });
  }

  remove(id: number) {
    // Soft delete: sets deleted_at timestamp
    return this.prisma.favorite.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
