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
import { FurnituretypeResponseDto } from '~/src/furnituretype/dto/furnituretype-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('furniture-types')
@Controller('furniture-types')
export class FurnituretypeController {
  constructor(private readonly furnituretypeService: FurnituretypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create furniture type' })
  @ApiResponse({
    status: 201,
    description: 'Furniture type created',
    type: FurnituretypeResponseDto,
  })
  async create(
    @Body() createFurnituretypeDto: CreateFurnituretypeDto,
  ): Promise<FurnituretypeResponseDto> {
    const created = await this.furnituretypeService.create(
      createFurnituretypeDto,
    );
    return plainToInstance(FurnituretypeResponseDto, created);
  }

  @Get()
  @ApiOperation({ summary: 'Get all furniture types' })
  @ApiResponse({
    status: 200,
    description: 'List of furniture types',
    type: [FurnituretypeResponseDto],
  })
  async findAll(): Promise<FurnituretypeResponseDto[]> {
    const types = await this.furnituretypeService.findAll();
    return plainToInstance(FurnituretypeResponseDto, types);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get furniture type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Furniture type found',
    type: FurnituretypeResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<FurnituretypeResponseDto> {
    const item = await this.furnituretypeService.findOne(+id);
    if (!item) throw new NotFoundException('Furniture type not found');
    return plainToInstance(FurnituretypeResponseDto, item);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update furniture type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Furniture type updated',
    type: FurnituretypeResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFurnituretypeDto: UpdateFurnituretypeDto,
  ): Promise<FurnituretypeResponseDto> {
    const updated = await this.furnituretypeService.update(
      +id,
      updateFurnituretypeDto,
    );
    return plainToInstance(FurnituretypeResponseDto, updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete furniture type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Furniture type soft deleted',
    type: FurnituretypeResponseDto,
  })
  async remove(@Param('id') id: string): Promise<FurnituretypeResponseDto> {
    const deleted = await this.furnituretypeService.remove(+id);
    return plainToInstance(FurnituretypeResponseDto, deleted);
  }
}
