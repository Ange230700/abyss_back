// src\furniturematerial\furniturematerial.module.ts

import { Module } from '@nestjs/common';
import { FurniturematerialService } from '~/src/furniturematerial/furniturematerial.service';
import { FurniturematerialController } from '~/src/furniturematerial/furniturematerial.controller';

@Module({
  providers: [FurniturematerialService],
  controllers: [FurniturematerialController],
})
export class FurniturematerialModule {}
