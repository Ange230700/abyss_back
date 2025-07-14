// src\image\image.controller.ts

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
import { ImageService } from '~/src/image/image.service';
import { CreateImageDto } from '~/src/image/dto/create-image.dto';
import { UpdateImageDto } from '~/src/image/dto/update-image.dto';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiOperation({ summary: 'Create image' })
  @ApiResponse({ status: 201, description: 'Image created' })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: 200, description: 'List of images' })
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({ status: 200, description: 'Image found' })
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update image by ID' })
  @ApiResponse({ status: 200, description: 'Image updated' })
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete image by ID' })
  @ApiResponse({ status: 200, description: 'Image soft deleted' })
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
