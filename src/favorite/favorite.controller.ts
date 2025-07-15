// src\favorite\favorite.controller.ts

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
import { FavoriteService } from '~/src/favorite/favorite.service';
import { CreateFavoriteDto } from '~/src/favorite/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '~/src/favorite/dto/update-favorite.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({ status: 201, description: 'Favorite created' })
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite found' })
  async findOne(@Param('id') id: string) {
    const item = await this.favoriteService.findOne(+id);
    if (!item) throw new NotFoundException('Furniture not found');
    return item;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite updated' })
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite soft deleted' })
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
