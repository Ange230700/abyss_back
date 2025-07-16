// src\image\image.controller.ts

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
import { ImageService } from '~/src/image/image.service';
import { CreateImageDto } from '~/src/image/dto/create-image.dto';
import { UpdateImageDto } from '~/src/image/dto/update-image.dto';
import { ImageResponseDto } from '~/src/image/dto/image-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiOperation({ summary: 'Create image' })
  @ApiResponse({
    status: 201,
    description: 'Image created',
    type: ImageResponseDto,
  })
  async create(
    @Body() createImageDto: CreateImageDto,
  ): Promise<ImageResponseDto> {
    const created = await this.imageService.create(createImageDto);
    return plainToInstance(ImageResponseDto, created);
  }

  @Get()
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({
    status: 200,
    description: 'List of images',
    type: [ImageResponseDto],
  })
  async findAll(): Promise<ImageResponseDto[]> {
    const images = await this.imageService.findAll();
    return plainToInstance(ImageResponseDto, images);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({
    status: 200,
    description: 'Image found',
    type: ImageResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<ImageResponseDto> {
    const image = await this.imageService.findOne(+id);
    if (!image) throw new NotFoundException('Image not found');
    return plainToInstance(ImageResponseDto, image);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update image by ID' })
  @ApiResponse({
    status: 200,
    description: 'Image updated',
    type: ImageResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ): Promise<ImageResponseDto> {
    const updated = await this.imageService.update(+id, updateImageDto);
    return plainToInstance(ImageResponseDto, updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete image by ID' })
  @ApiResponse({
    status: 200,
    description: 'Image soft deleted',
    type: ImageResponseDto,
  })
  async remove(@Param('id') id: string): Promise<ImageResponseDto> {
    const deleted = await this.imageService.remove(+id);
    return plainToInstance(ImageResponseDto, deleted);
  }
}
