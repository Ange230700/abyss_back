// src\favorite\dto\create-favorite.dto.ts

import { IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateFavoriteDto {
  @IsInt()
  id_furniture: number;

  @IsInt()
  id_user: number;

  @IsBoolean()
  is_favorite: boolean;

  @IsOptional()
  deleted_at?: Date;
}
