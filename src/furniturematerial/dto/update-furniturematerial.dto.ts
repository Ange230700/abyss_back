// src\furniturematerial\dto\update-furniturematerial.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateFurniturematerialDto } from '~/src/furniturematerial/dto/create-furniturematerial.dto';

export class UpdateFurniturematerialDto extends PartialType(
  CreateFurniturematerialDto,
) {}
