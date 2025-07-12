import { Module } from '@nestjs/common';
import { FurnitureService } from '~/src/furniture/furniture.service';
import { FurnitureController } from '~/src/furniture/furniture.controller';

@Module({
  providers: [FurnitureService],
  controllers: [FurnitureController],
})
export class FurnitureModule {}
