// src\material\material.controller.ts

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
import { MaterialService } from '~/src/material/material.service';
import { CreateMaterialDto } from '~/src/material/dto/create-material.dto';
import { UpdateMaterialDto } from '~/src/material/dto/update-material.dto';
import { MaterialResponseDto } from '~/src/material/dto/material-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('materials')
@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiOperation({ summary: 'Create material' })
  @ApiResponse({
    status: 201,
    description: 'Material created',
    type: MaterialResponseDto,
  })
  async create(
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<MaterialResponseDto> {
    const created = await this.materialService.create(createMaterialDto);
    return plainToInstance(MaterialResponseDto, created);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({
    status: 200,
    description: 'List of materials',
    type: [MaterialResponseDto],
  })
  async findAll(): Promise<MaterialResponseDto[]> {
    const data = await this.materialService.findAll();
    return plainToInstance(MaterialResponseDto, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get material by ID' })
  @ApiResponse({
    status: 200,
    description: 'Material found',
    type: MaterialResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<MaterialResponseDto> {
    const material = await this.materialService.findOne(+id);
    if (!material) throw new NotFoundException('Material not found');
    return plainToInstance(MaterialResponseDto, material);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update material by ID' })
  @ApiResponse({
    status: 200,
    description: 'Material updated',
    type: MaterialResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ): Promise<MaterialResponseDto> {
    const updated = await this.materialService.update(+id, updateMaterialDto);
    return plainToInstance(MaterialResponseDto, updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete material by ID' })
  @ApiResponse({
    status: 200,
    description: 'Material soft deleted',
    type: MaterialResponseDto,
  })
  async remove(@Param('id') id: string): Promise<MaterialResponseDto> {
    const deleted = await this.materialService.remove(+id);
    return plainToInstance(MaterialResponseDto, deleted);
  }
}
