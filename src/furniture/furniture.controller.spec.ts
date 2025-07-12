import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureController } from './furniture.controller';

describe('FurnitureController', () => {
  let controller: FurnitureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnitureController],
    }).compile();

    controller = module.get<FurnitureController>(FurnitureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
