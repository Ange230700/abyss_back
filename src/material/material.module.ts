import { Module } from '@nestjs/common';
import { MaterialService } from '~/src/material/material.service';
import { MaterialController } from '~/src/material/material.controller';

@Module({
  providers: [MaterialService],
  controllers: [MaterialController],
})
export class MaterialModule {}
