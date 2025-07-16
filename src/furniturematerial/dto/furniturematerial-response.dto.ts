// src\furniturematerial\dto\furniturematerial-response.dto.ts

import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class FurnitureMaterialResponseDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID of the furniture',
  })
  @IsInt()
  id_furniture: number;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID of the material',
  })
  @IsInt()
  id_material: number;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Deletion timestamp',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date;
}
