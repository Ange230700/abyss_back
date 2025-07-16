// src\furniturematerial\dto\furniturematerial-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class FurnitureMaterialResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_furniture: number;

  @ApiProperty()
  id_material: number;

  @ApiProperty({ required: false, nullable: true })
  deleted_at?: Date;

  @ApiProperty({ required: false }) furnitureName?: string;

  @ApiProperty({ required: false }) materialName?: string;
}
