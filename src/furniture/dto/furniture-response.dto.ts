// src/furniture/dto/furniture-response.dto.ts

import { faker } from '@faker-js/faker';
import { IsInt, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { status } from '@prisma/client';

export class FurnitureResponseDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: faker.commerce.productName(),
    description: 'Furniture name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: faker.commerce.productDescription(),
    description: 'Furniture description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 5 }),
    description: 'Type ID',
  })
  @IsInt()
  id_type: number;

  @ApiProperty({
    example: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
    description: 'Furniture size',
  })
  @IsString()
  size: string;

  @ApiProperty({
    example: faker.color.human(),
    description: 'Furniture colour',
  })
  @IsString()
  colour: string;

  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'Quantity in stock',
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    example: parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 2 })),
    description: 'Price',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    enum: status,
    example: status.AVAILABLE,
    description: 'Status',
  })
  @IsEnum(status)
  status: string;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Deletion timestamp',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date | null;
}
