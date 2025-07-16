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
import { UserResponseDto } from '~/src/user/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const created = await this.userService.create(createUserDto);
    const { password, ...safeUser } = created;
    return plainToInstance(UserResponseDto, safeUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map(({ password, ...rest }) =>
      plainToInstance(UserResponseDto, rest),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOne(Number(id));
    if (!user) throw new NotFoundException('User not found');
    const { password, ...safeUser } = user;
    return plainToInstance(UserResponseDto, safeUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updated = await this.userService.update(Number(id), updateUserDto);
    const { password, ...safeUser } = updated;
    return plainToInstance(UserResponseDto, safeUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted (soft delete)',
    type: UserResponseDto,
  })
  async remove(@Param('id') id: string): Promise<UserResponseDto> {
    const deleted = await this.userService.remove(Number(id));
    const { password, ...safeUser } = deleted;
    return plainToInstance(UserResponseDto, safeUser);
  }
}
