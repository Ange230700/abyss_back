import { Test, TestingModule } from '@nestjs/testing';
import { FurniturematerialService } from './furniturematerial.service';

describe('FurniturematerialService', () => {
  let service: FurniturematerialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurniturematerialService],
    }).compile();

    service = module.get<FurniturematerialService>(FurniturematerialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
