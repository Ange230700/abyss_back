import { Test, TestingModule } from '@nestjs/testing';
import { FurniturematerialController } from './furniturematerial.controller';

describe('FurniturematerialController', () => {
  let controller: FurniturematerialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurniturematerialController],
    }).compile();

    controller = module.get<FurniturematerialController>(
      FurniturematerialController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
