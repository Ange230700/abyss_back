// src\furnituretype\dto\create-furnituretype.dto.ts

import { faker } from '@faker-js/faker';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFurnituretypeDto {
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
  deleted_at?: Date | null;
}
