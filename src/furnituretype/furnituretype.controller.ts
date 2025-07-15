// src\furnituretype\furnituretype.controller.ts

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
import { FurnituretypeService } from '~/src/furnituretype/furnituretype.service';
import { CreateFurnituretypeDto } from '~/src/furnituretype/dto/create-furnituretype.dto';
import { UpdateFurnituretypeDto } from '~/src/furnituretype/dto/update-furnituretype.dto';

@ApiTags('furniture-types')
@Controller('furniture-types')
export class FurnituretypeController {
  constructor(private readonly furnituretypeService: FurnituretypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create furniture type' })
  @ApiResponse({ status: 201, description: 'Furniture type created' })
  create(@Body() createFurnituretypeDto: CreateFurnituretypeDto) {
    return this.furnituretypeService.create(createFurnituretypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all furniture types' })
  @ApiResponse({ status: 200, description: 'List of furniture types' })
  findAll() {
    return this.furnituretypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get furniture type by ID' })
  @ApiResponse({ status: 200, description: 'Furniture type found' })
  async findOne(@Param('id') id: string) {
    const item = await this.furnituretypeService.findOne(+id);
    if (!item) throw new NotFoundException('Furniture type not found');
    return item;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update furniture type by ID' })
  @ApiResponse({ status: 200, description: 'Furniture type updated' })
  update(
    @Param('id') id: string,
    @Body() updateFurnituretypeDto: UpdateFurnituretypeDto,
  ) {
    return this.furnituretypeService.update(+id, updateFurnituretypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete furniture type by ID' })
  @ApiResponse({ status: 200, description: 'Furniture type soft deleted' })
  remove(@Param('id') id: string) {
    return this.furnituretypeService.remove(+id);
  }
}
