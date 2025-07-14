// src\image\dto\update-image.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from '~/src/image/dto/create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
