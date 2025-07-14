// src\favorite\dto\update-favorite.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from '~/src/favorite/dto/create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}
