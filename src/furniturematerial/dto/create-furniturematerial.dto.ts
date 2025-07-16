// src\furniturematerial\dto\create-furniturematerial.dto.ts

import { faker } from '@faker-js/faker';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFurniturematerialDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 10 }),
    description: 'Furniture ID',
  })
  @IsInt()
  id_furniture: number;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 10 }),
    description: 'Material ID',
  })
  @IsInt()
  id_material: number;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Optional deletion date',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date | null;
}
