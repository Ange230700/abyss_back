// src\favorite\dto\create-favorite.dto.ts

import { IsInt, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'Furniture ID' })
  @IsInt()
  id_furniture: number;

  @ApiProperty({ example: 2, description: 'User ID' })
  @IsInt()
  id_user: number;

  @ApiProperty({ example: true, description: 'Is favorite?' })
  @IsBoolean()
  is_favorite: boolean;

  @ApiPropertyOptional({
    example: '2024-07-10T13:00:00Z',
    description: 'Deletion timestamp',
  })
  @IsOptional()
  deleted_at?: Date;
}
