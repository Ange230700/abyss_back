// src\user\dto\create-user.dto.ts

import { IsString, IsEmail, IsEnum } from 'class-validator';
import { role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(role)
  role: role;
}
