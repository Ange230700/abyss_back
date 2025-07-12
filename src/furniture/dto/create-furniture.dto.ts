// src\furniture\dto\create-furniture.dto.ts

import { IsString, IsInt, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { status } from '@prisma/client';

export class CreateFurnitureDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsInt()
  id_type: number;
  @IsString()
  size: string;
  @IsString()
  colour: string;
  @IsInt()
  quantity: number;
  @IsNumber()
  price: number;
  @IsEnum(status)
  status: status;

  @IsOptional()
  deleted_at?: Date;
}
