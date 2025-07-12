// src\image\dto\create-image.dto.ts

import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ example: 1, description: 'Furniture ID' })
  @IsInt()
  id_furniture: number;

  @ApiProperty({
    example: 'https://picsum.photos/400/300',
    description: 'Image URL',
  })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: '2024-07-10T13:00:00Z' })
  @IsOptional()
  deleted_at?: Date;
}
