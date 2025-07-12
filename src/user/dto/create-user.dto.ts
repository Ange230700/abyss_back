// src\user\dto\create-user.dto.ts

import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'User name' })
  @IsString()
  user_name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ enum: role, example: 'customer', description: 'User role' })
  @IsEnum(role)
  role: role;
}
