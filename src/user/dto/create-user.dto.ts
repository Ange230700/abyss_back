// src\user\dto\create-user.dto.ts

import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { role } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class CreateUserDto {
  @ApiProperty({ example: faker.internet.username(), description: 'User name' })
  @IsString()
  user_name: string;

  @ApiProperty({
    example: faker.internet.email(),
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: faker.internet.password({ length: 12 }),
    description: 'User password',
  })
  @IsString()
  password: string;

  @ApiProperty({ enum: role, example: 'customer', description: 'User role' })
  @IsEnum(role)
  role: role;

  @ApiPropertyOptional({
    example: faker.date.recent().toISOString(),
    description: 'Soft delete timestamp (optional)',
    required: false,
    nullable: true,
  })
  @IsOptional()
  deleted_at?: Date | null;
}
