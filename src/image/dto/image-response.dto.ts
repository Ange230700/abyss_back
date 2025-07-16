// src\image\dto\image-response.dto.ts

import { faker } from '@faker-js/faker';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ImageResponseDto {
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
    example: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
    description: 'Image URL',
  })
  @IsString()
  url: string;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Soft delete timestamp (optional)',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date | null;
}
