// src\favorite\dto\favorite-response.dto.ts

import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FavoriteResponseDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID',
  })
  id: number;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID of the furniture',
  })
  id_furniture: number;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID of the user',
  })
  id_user: number;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'Does the user like the furniture?',
  })
  is_favorite: boolean;

  @ApiProperty({
    example: faker.date.recent().toISOString(),
    description: 'Deletion timestamp',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date | null;
}
