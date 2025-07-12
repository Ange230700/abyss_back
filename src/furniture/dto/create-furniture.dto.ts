// src\furniture\dto\create-furniture.dto.ts

import { IsString, IsInt, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { status } from '@prisma/client';

export class CreateFurnitureDto {
  @ApiProperty({ example: 'Office Chair', description: 'Furniture name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Ergonomic office chair',
    description: 'Furniture description',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'Type ID' })
  @IsInt()
  id_type: number;

  @ApiProperty({ example: 'Large', description: 'Furniture size' })
  @IsString()
  size: string;

  @ApiProperty({ example: 'Red', description: 'Furniture colour' })
  @IsString()
  colour: string;

  @ApiProperty({ example: 10, description: 'Quantity in stock' })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 120.5, description: 'Price' })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: status, example: 'Available', description: 'Status' })
  @IsEnum(status)
  status: status;

  @ApiPropertyOptional({ example: '2024-07-10T13:00:00Z' })
  @IsOptional()
  deleted_at?: Date;
}
