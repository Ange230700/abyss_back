// src\furniture\dto\update-furniture.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnitureDto } from '~/src/furniture/dto/create-furniture.dto';

export class UpdateFurnitureDto extends PartialType(CreateFurnitureDto) {}
