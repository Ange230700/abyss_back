// src\app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';
import { PrismaModule } from '~/src/prisma/prisma.module';
import { UserModule } from '~/src/user/user.module';
import { FurnitureModule } from '~/src/furniture/furniture.module';
import { FavoriteModule } from '~/src/favorite/favorite.module';
import { FurnituretypeModule } from '~/src/furnituretype/furnituretype.module';
import { FurniturematerialModule } from '~/src/furniturematerial/furniturematerial.module';
import { MaterialModule } from '~/src/material/material.module';
import { ImageModule } from '~/src/image/image.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    FurnitureModule,
    FavoriteModule,
    FurnituretypeModule,
    FurniturematerialModule,
    MaterialModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
