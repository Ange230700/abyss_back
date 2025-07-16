// src\furnituretype\dto\furnituretype-response.dto.ts

import { faker } from '@faker-js/faker';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FurnituretypeResponseDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example:
      faker.commerce.productAdjective() + '-' + faker.string.alphanumeric(5),
    description: 'Type of furniture',
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
