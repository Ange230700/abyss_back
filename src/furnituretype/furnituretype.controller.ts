// src\furnituretype\furnituretype.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FurnituretypeService } from '~/src/furnituretype/furnituretype.service';
import { CreateFurnituretypeDto } from '~/src/furnituretype/dto/create-furnituretype.dto';
import { UpdateFurnituretypeDto } from '~/src/furnituretype/dto/update-furnituretype.dto';

@Controller('furniture-types')
export class FurnituretypeController {
  constructor(private readonly furnituretypeService: FurnituretypeService) {}

  @Post()
  create(@Body() createFurnituretypeDto: CreateFurnituretypeDto) {
    return this.furnituretypeService.create(createFurnituretypeDto);
  }

  @Get()
  findAll() {
    return this.furnituretypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnituretypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnituretypeDto: UpdateFurnituretypeDto,
  ) {
    return this.furnituretypeService.update(+id, updateFurnituretypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.furnituretypeService.remove(+id);
  }
}
