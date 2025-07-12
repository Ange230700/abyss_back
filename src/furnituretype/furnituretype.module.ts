import { Module } from '@nestjs/common';
import { FurnituretypeService } from '~/src/furnituretype/furnituretype.service';
import { FurnituretypeController } from '~/src/furnituretype/furnituretype.controller';

@Module({
  providers: [FurnituretypeService],
  controllers: [FurnituretypeController],
})
export class FurnituretypeModule {}
