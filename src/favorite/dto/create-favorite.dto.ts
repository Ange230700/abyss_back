// src\favorite\dto\create-favorite.dto.ts

import { faker } from '@faker-js/faker';
import { IsInt, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'Furniture ID',
  })
  @IsInt()
  id_furniture: number;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'User ID',
  })
  @IsInt()
  id_user: number;

  @ApiProperty({
    example: faker.datatype.boolean(),
    description: 'Is favorite?',
  })
  @IsBoolean()
  is_favorite: boolean;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Deletion timestamp',
  })
  @IsOptional()
  deleted_at?: Date;
}
