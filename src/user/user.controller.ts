// src\user\user.controller.ts

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
import { UserService } from '~/src/user/user.service';
import { CreateUserDto } from '~/src/user/dto/create-user.dto';
import { UpdateUserDto } from '~/src/user/dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'The found user' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id).then((user) => {
      if (!user) throw new NotFoundException('User not found');
      return user;
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'The updated user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted (soft delete)' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
