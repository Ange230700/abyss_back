// src\user\dto\user-response.dto.ts

import { IsString, IsEmail, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { role } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class UserResponseDto {
  @ApiProperty({
    example: faker.number.int({ min: 1, max: 100 }),
    description: 'ID',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: faker.internet.username(),
    description: 'User name',
  })
  @IsString()
  user_name: string;

  @ApiProperty({
    example: faker.internet.email(),
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: role,
    example: role.customer,
    description: 'User role',
  })
  @IsEnum(role)
  role: string;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Soft delete timestamp (optional)',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date | null;
}
