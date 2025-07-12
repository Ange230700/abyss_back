// src\favorite\favorite.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from '~/src/favorite/favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
