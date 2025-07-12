// src\furnituretype\dto\update-furnituretype.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnituretypeDto } from '~/src/furnituretype/dto/create-furnituretype.dto';

export class UpdateFurnituretypeDto extends PartialType(
  CreateFurnituretypeDto,
) {}
