// src\material\material.controller.spec.ts

import { faker } from '@faker-js/faker';
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
    const dto = { name: faker.commerce.productMaterial() };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    const fakeArray = [
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
    ];
    service.findAll.mockResolvedValue(fakeArray);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeArray);
  });

  it('should call service.findOne on findOne()', async () => {
    const id = faker.number.int({ min: 1, max: 1000 });
    service.findOne.mockResolvedValue('found');
    const result = await controller.findOne(id.toString());
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toBe('found');
  });

  it('should call service.update on update()', async () => {
    const id = faker.number.int({ min: 1, max: 1000 });
    const dto = { name: faker.commerce.productMaterial() };
    service.update.mockResolvedValue('updated');
    const result = await controller.update(id.toString(), dto as any);
    expect(service.update).toHaveBeenCalledWith(id, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    const id = faker.number.int({ min: 1, max: 1000 });
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove(id.toString());
    expect(service.remove).toHaveBeenCalledWith(id);
    expect(result).toBe('deleted');
  });
});
