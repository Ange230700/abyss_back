// src\material\dto\update-material.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialDto } from '~/src/material/dto/create-material.dto';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}
