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
import { FavoriteResponseDto } from '~/src/favorite/dto/favorite-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({
    status: 201,
    description: 'Favorite created',
    type: FavoriteResponseDto,
  })
  async create(
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    const favorite = await this.favoriteService.create(createFavoriteDto);
    return plainToInstance(FavoriteResponseDto, favorite);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'List of favorites',
    type: [FavoriteResponseDto],
  })
  async findAll(): Promise<FavoriteResponseDto[]> {
    const data = await this.favoriteService.findAll();
    return plainToInstance(FavoriteResponseDto, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get favorite by ID' })
  @ApiResponse({
    status: 200,
    description: 'Favorite found',
    type: FavoriteResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<FavoriteResponseDto> {
    const item = await this.favoriteService.findOne(+id);
    if (!item) throw new NotFoundException('Furniture not found');
    return plainToInstance(FavoriteResponseDto, item);
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
