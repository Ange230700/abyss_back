// src/furniture/dto/furniture-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FurnitureResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  id_type: number;

  @ApiProperty()
  size: string;

  @ApiProperty()
  colour: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ required: false, nullable: true })
  imageUrls?: string[];
}
