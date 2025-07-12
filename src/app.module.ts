// src\app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';
import { PrismaModule } from '~/src/prisma/prisma.module';
import { UserModule } from '~/src/user/user.module';
import { FurnitureModule } from './furniture/furniture.module';

@Module({
  imports: [PrismaModule, UserModule, FurnitureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
