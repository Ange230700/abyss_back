// src\furnituretype\dto\create-furnituretype.dto.ts

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFurnituretypeDto {
  @ApiProperty({ example: 'Chair', description: 'Type of furniture' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '2024-07-10T13:00:00Z' })
  @IsOptional()
  deleted_at?: Date;
}
