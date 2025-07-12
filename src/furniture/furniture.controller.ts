// src\furniture\furniture.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FurnitureService } from '~/src/furniture/furniture.service';
import { CreateFurnitureDto } from '~/src/furniture/dto/create-furniture.dto';
import { UpdateFurnitureDto } from '~/src/furniture/dto/update-furniture.dto';

@ApiTags('furniture')
@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  @ApiOperation({ summary: 'Create furniture item' })
  @ApiResponse({ status: 201, description: 'Furniture created' })
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all furniture' })
  @ApiResponse({ status: 200, description: 'List of furniture' })
  findAll() {
    return this.furnitureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get furniture by ID' })
  @ApiResponse({ status: 200, description: 'Single furniture item' })
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update furniture by ID' })
  @ApiResponse({ status: 200, description: 'Updated furniture item' })
  update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: UpdateFurnitureDto,
  ) {
    return this.furnitureService.update(+id, updateFurnitureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete furniture by ID' })
  @ApiResponse({ status: 200, description: 'Furniture item deleted' })
  remove(@Param('id') id: string) {
    return this.furnitureService.remove(+id);
  }
}
