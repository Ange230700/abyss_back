// src\material\dto\create-material.dto.ts

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({ example: 'Wood', description: 'Material name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '2024-07-10T13:00:00Z' })
  @IsOptional()
  deleted_at?: Date;
}
