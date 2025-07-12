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
import { FurnitureService } from './furniture.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  create(@Body() createFurnitureDto: CreateFurnitureDto) {
    return this.furnitureService.create(createFurnitureDto);
  }

  @Get()
  findAll() {
    return this.furnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnitureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnitureDto: UpdateFurnitureDto,
  ) {
    return this.furnitureService.update(+id, updateFurnitureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnitureService.remove(+id);
  }
}
