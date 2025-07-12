// src\image\dto\create-image.dto.ts

import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsInt()
  id_furniture: number;

  @IsString()
  url: string;

  @IsOptional()
  deleted_at?: Date;
}
