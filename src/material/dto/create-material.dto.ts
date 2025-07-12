// src\material\dto\create-material.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsOptional()
  deleted_at?: Date;
}
