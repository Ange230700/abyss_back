// src\image\dto\create-image.dto.ts

import { faker } from '@faker-js/faker';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'Furniture ID',
  })
  @IsInt()
  id_furniture: number;

  @ApiProperty({
    example: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
    description: 'Image URL',
  })
  @IsString()
  url: string;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Soft delete timestamp (optional)',
  })
  @IsOptional()
  deleted_at?: Date | null;
}
