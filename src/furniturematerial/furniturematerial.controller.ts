// src\furniturematerial\furniturematerial.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FurniturematerialService } from '~/src/furniturematerial/furniturematerial.service';
import { CreateFurniturematerialDto } from '~/src/furniturematerial/dto/create-furniturematerial.dto';
import { UpdateFurniturematerialDto } from '~/src/furniturematerial/dto/update-furniturematerial.dto';

@Controller('furniture-materials')
export class FurniturematerialController {
  constructor(
    private readonly furniturematerialService: FurniturematerialService,
  ) {}

  @Post()
  create(@Body() createFurniturematerialDto: CreateFurniturematerialDto) {
    return this.furniturematerialService.create(createFurniturematerialDto);
  }

  @Get()
  findAll() {
    return this.furniturematerialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furniturematerialService.findOne(+id);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.furniturematerialService.remove(+id);
  }
}
