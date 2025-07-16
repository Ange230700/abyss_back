// src\image\dto\image-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_furniture: number;

  @ApiProperty()
  url: string;
}
