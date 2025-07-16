// src\furniturematerial\furniturematerial.controller.ts

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
import { FurniturematerialService } from '~/src/furniturematerial/furniturematerial.service';
import { CreateFurniturematerialDto } from '~/src/furniturematerial/dto/create-furniturematerial.dto';
import { UpdateFurniturematerialDto } from '~/src/furniturematerial/dto/update-furniturematerial.dto';
import { FurnitureMaterialResponseDto } from '~/src/furniturematerial/dto/furniturematerial-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('furniture-materials')
@Controller('furniture-materials')
export class FurniturematerialController {
  constructor(
    private readonly furniturematerialService: FurniturematerialService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create furniture-material link' })
  @ApiResponse({
    status: 201,
    description: 'Furniture-material link created',
    type: FurnitureMaterialResponseDto,
  })
  create(@Body() createFurniturematerialDto: CreateFurniturematerialDto) {
    return this.furniturematerialService.create(createFurniturematerialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all furniture-material links' })
  @ApiResponse({
    status: 200,
    description: 'List of furniture-material links',
    type: [FurnitureMaterialResponseDto],
  })
  async findAll(): Promise<FurnitureMaterialResponseDto[]> {
    const data = await this.furniturematerialService.findAll();
    return plainToInstance(FurnitureMaterialResponseDto, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get furniture-material by ID' })
  @ApiResponse({
    status: 200,
    description: 'Furniture-material found',
    type: FurnitureMaterialResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<FurnitureMaterialResponseDto> {
    const item = await this.furniturematerialService.findOne(+id);
    if (!item) throw new NotFoundException('Furniture-material not found');
    return plainToInstance(FurnitureMaterialResponseDto, item);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update furniture-material by ID' })
  @ApiResponse({ status: 200, description: 'Furniture-material updated' })
  update(
    @Param('id') id: string,
    @Body() updateFurniturematerialDto: UpdateFurniturematerialDto,
  ) {
    return this.furniturematerialService.update(
      +id,
      updateFurniturematerialDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete furniture-material by ID' })
  @ApiResponse({ status: 200, description: 'Furniture-material soft deleted' })
  remove(@Param('id') id: string) {
    return this.furniturematerialService.remove(+id);
  }
}
