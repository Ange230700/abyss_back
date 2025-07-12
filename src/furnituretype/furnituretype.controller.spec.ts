import { Test, TestingModule } from '@nestjs/testing';
import { FurnituretypeController } from './furnituretype.controller';

describe('FurnituretypeController', () => {
  let controller: FurnituretypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnituretypeController],
    }).compile();

    controller = module.get<FurnituretypeController>(FurnituretypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
