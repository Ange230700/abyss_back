// src\material\dto\material-response.dto.ts

import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class MaterialResponseDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID',
  })
  @IsInt()
  id: number;

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
  deleted_at?: Date | null;
}
