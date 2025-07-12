// src\furnituretype\dto\create-furnituretype.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class CreateFurnituretypeDto {
  @IsString()
  name: string;

  @IsOptional()
  deleted_at?: Date;
}
