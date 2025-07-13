// src\furnituretype\furnituretype.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FurnituretypeController } from '~/src/furnituretype/furnituretype.controller';
import { FurnituretypeService } from '~/src/furnituretype/furnituretype.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('FurnituretypeController', () => {
  let controller: FurnituretypeController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnituretypeController],
      providers: [{ provide: FurnituretypeService, useValue: serviceMock }],
    }).compile();

    controller = module.get<FurnituretypeController>(FurnituretypeController);
    service = module.get(FurnituretypeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = { name: 'Table' };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['type1', 'type2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['type1', 'type2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('found');
    const result = await controller.findOne('6');
    expect(service.findOne).toHaveBeenCalledWith(6);
    expect(result).toBe('found');
  });

  it('should call service.update on update()', async () => {
    const dto = { name: 'Updated' };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('7', dto as any);
    expect(service.update).toHaveBeenCalledWith(7, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('8');
    expect(service.remove).toHaveBeenCalledWith(8);
    expect(result).toBe('deleted');
  });
});
