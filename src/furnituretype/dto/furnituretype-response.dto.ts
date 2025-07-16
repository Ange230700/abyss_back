// src\furnituretype\dto\furnituretype-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FurnituretypeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
