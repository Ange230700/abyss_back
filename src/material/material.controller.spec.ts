// src\material\material.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { MaterialController } from '~/src/material/material.controller';
import { MaterialService } from '~/src/material/material.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('MaterialController', () => {
  let controller: MaterialController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialController],
      providers: [{ provide: MaterialService, useValue: serviceMock }],
    }).compile();

    controller = module.get<MaterialController>(MaterialController);
    service = module.get(MaterialService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = { name: 'Glass' };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['mat1', 'mat2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['mat1', 'mat2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('found');
    const result = await controller.findOne('3');
    expect(service.findOne).toHaveBeenCalledWith(3);
    expect(result).toBe('found');
  });

  it('should call service.update on update()', async () => {
    const dto = { name: 'Plastic' };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('2', dto as any);
    expect(service.update).toHaveBeenCalledWith(2, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('9');
    expect(service.remove).toHaveBeenCalledWith(9);
    expect(result).toBe('deleted');
  });
});
