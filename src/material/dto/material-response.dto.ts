// src\material\dto\material-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class MaterialResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
