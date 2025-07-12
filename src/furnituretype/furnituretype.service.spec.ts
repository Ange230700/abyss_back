import { Test, TestingModule } from '@nestjs/testing';
import { FurnituretypeService } from './furnituretype.service';

describe('FurnituretypeService', () => {
  let service: FurnituretypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnituretypeService],
    }).compile();

    service = module.get<FurnituretypeService>(FurnituretypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
