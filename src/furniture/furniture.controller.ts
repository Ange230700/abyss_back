// src\furniture\furniture.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FurnitureService } from '~/src/furniture/furniture.service';
import { CreateFurnitureDto } from '~/src/furniture/dto/create-furniture.dto';
import { UpdateFurnitureDto } from '~/src/furniture/dto/update-furniture.dto';
import { FurnitureResponseDto } from '~/src/furniture/dto/furniture-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('furnitures')
@Controller('furnitures')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  @ApiOperation({ summary: 'Create furniture item' })
  @ApiResponse({
    status: 201,
    description: 'Furniture created',
    type: FurnitureResponseDto,
  })
  async create(
    @Body() createFurnitureDto: CreateFurnitureDto,
  ): Promise<FurnitureResponseDto> {
    const created = await this.furnitureService.create(createFurnitureDto);
    return plainToInstance(FurnitureResponseDto, created);
  }

  @Get()
  @ApiOperation({ summary: 'Get all furniture' })
  @ApiResponse({
    status: 200,
    description: 'List of furniture',
    type: [FurnitureResponseDto],
  })
  async findAll(): Promise<FurnitureResponseDto[]> {
    const items = await this.furnitureService.findAll();
    return plainToInstance(FurnitureResponseDto, items);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get furniture by ID' })
  @ApiResponse({
    status: 200,
    description: 'Single furniture item',
    type: FurnitureResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<FurnitureResponseDto> {
    const item = await this.furnitureService.findOne(+id);
    if (!item) throw new NotFoundException('Furniture not found');
    return plainToInstance(FurnitureResponseDto, item);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update furniture by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated furniture item',
    type: FurnitureResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: UpdateFurnitureDto,
  ): Promise<FurnitureResponseDto> {
    const updated = await this.furnitureService.update(+id, updateFurnitureDto);
    return plainToInstance(FurnitureResponseDto, updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete furniture by ID' })
  @ApiResponse({
    status: 200,
    description: 'Furniture item deleted',
    type: FurnitureResponseDto,
  })
  async remove(@Param('id') id: string): Promise<FurnitureResponseDto> {
    const deleted = await this.furnitureService.remove(+id);
    return plainToInstance(FurnitureResponseDto, deleted);
  }
}
