// src\furniturematerial\furniturematerial.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FurniturematerialController } from '~/src/furniturematerial/furniturematerial.controller';
import { FurniturematerialService } from '~/src/furniturematerial/furniturematerial.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('FurniturematerialController', () => {
  let controller: FurniturematerialController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurniturematerialController],
      providers: [{ provide: FurniturematerialService, useValue: serviceMock }],
    }).compile();

    controller = module.get<FurniturematerialController>(
      FurniturematerialController,
    );
    service = module.get(FurniturematerialService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = { id_furniture: 1, id_material: 2 };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['fm1', 'fm2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['fm1', 'fm2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('one');
    const result = await controller.findOne('6');
    expect(service.findOne).toHaveBeenCalledWith(6);
    expect(result).toBe('one');
  });

  it('should call service.update on update()', async () => {
    const dto = { id_furniture: 3 };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('9', dto as any);
    expect(service.update).toHaveBeenCalledWith(9, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('11');
    expect(service.remove).toHaveBeenCalledWith(11);
    expect(result).toBe('deleted');
  });
});
