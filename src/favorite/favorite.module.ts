// src\favorite\favorite.module.ts

import { Module } from '@nestjs/common';
import { FavoriteService } from '~/src/favorite/favorite.service';
import { FavoriteController } from '~/src/favorite/favorite.controller';

@Module({
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
