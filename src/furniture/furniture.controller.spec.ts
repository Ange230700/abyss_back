// src/furniture/furniture.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureController } from '~/src/furniture/furniture.controller';
import { FurnitureService } from '~/src/furniture/furniture.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('FurnitureController', () => {
  let controller: FurnitureController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnitureController],
      providers: [{ provide: FurnitureService, useValue: serviceMock }],
    }).compile();

    controller = module.get<FurnitureController>(FurnitureController);
    service = module.get(FurnitureService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = {
      name: 'Table',
      description: 'desc',
      id_type: 2,
      size: 'M',
      colour: 'Blue',
      quantity: 3,
      price: 50,
      status: 'Available',
    };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['item1', 'item2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['item1', 'item2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('furniture');
    const result = await controller.findOne('7');
    expect(service.findOne).toHaveBeenCalledWith(7);
    expect(result).toBe('furniture');
  });

  it('should call service.update on update()', async () => {
    const dto = { name: 'New name' };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('8', dto as any);
    expect(service.update).toHaveBeenCalledWith(8, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('5');
    expect(service.remove).toHaveBeenCalledWith(5);
    expect(result).toBe('deleted');
  });
});
