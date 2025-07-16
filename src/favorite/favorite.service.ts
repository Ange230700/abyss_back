// src\favorite\favorite.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';
import { CreateFavoriteDto } from '~/src/favorite/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '~/src/favorite/dto/update-favorite.dto';
import { favorite } from '@prisma/client';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFavoriteDto): Promise<favorite> {
    return this.prisma.favorite.create({ data });
  }

  findAll(): Promise<favorite[]> {
    return this.prisma.favorite.findMany({ where: { deleted_at: null } });
  }

  findOne(id: number): Promise<favorite | null> {
    return this.prisma.favorite.findUnique({ where: { id, deleted_at: null } });
  }

  update(id: number, data: UpdateFavoriteDto): Promise<favorite> {
    return this.prisma.favorite.update({ where: { id }, data });
  }

  remove(id: number): Promise<favorite> {
    return this.prisma.favorite.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
