// src\furniturematerial\dto\create-furniturematerial.dto.ts

import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFurniturematerialDto {
  @ApiProperty({ example: 1, description: 'Furniture ID' })
  @IsInt()
  id_furniture: number;

  @ApiProperty({ example: 2, description: 'Material ID' })
  @IsInt()
  id_material: number;

  @ApiPropertyOptional({ example: '2024-07-10T13:00:00Z' })
  @IsOptional()
  deleted_at?: Date;
}
