import { Module } from '@nestjs/common';
import { FurnitureService } from './furniture.service';
import { FurnitureController } from './furniture.controller';

@Module({
  providers: [FurnitureService],
  controllers: [FurnitureController],
})
export class FurnitureModule {}
