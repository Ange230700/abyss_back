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

@ApiTags('materials')
@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiOperation({ summary: 'Create material' })
  @ApiResponse({ status: 201, description: 'Material created' })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({ status: 200, description: 'List of materials' })
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get material by ID' })
  @ApiResponse({ status: 200, description: 'Material found' })
  async findOne(@Param('id') id: string) {
    const item = await this.materialService.findOne(+id);
    if (!item) throw new NotFoundException('Material not found');
    return item;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update material by ID' })
  @ApiResponse({ status: 200, description: 'Material updated' })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete material by ID' })
  @ApiResponse({ status: 200, description: 'Material soft deleted' })
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
