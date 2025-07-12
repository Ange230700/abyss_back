// src\furniturematerial\dto\create-furniturematerial.dto.ts

import { IsInt, IsOptional } from 'class-validator';

export class CreateFurniturematerialDto {
  @IsInt()
  id_furniture: number;

  @IsInt()
  id_material: number;

  @IsOptional()
  deleted_at?: Date;
}
