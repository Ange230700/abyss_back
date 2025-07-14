// src/material/dto/create-material.dto.ts

import { faker } from '@faker-js/faker';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({
    example: faker.commerce.productMaterial(),
    description: 'Material name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Optional deletion timestamp',
  })
  @IsOptional()
  deleted_at?: Date;
}
