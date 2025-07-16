// src\user\dto\user-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
