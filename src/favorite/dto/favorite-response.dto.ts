// src\favorite\dto\favorite-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FavoriteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_furniture: number;

  @ApiProperty()
  id_user: number;

  @ApiProperty()
  is_favorite: boolean;
}
