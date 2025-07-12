import { Module } from '@nestjs/common';
import { ImageService } from '~/src/image/image.service';
import { ImageController } from '~/src/image/image.controller';

@Module({
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
