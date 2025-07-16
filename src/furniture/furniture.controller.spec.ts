// src/furniture/furniture.controller.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureController } from '~/src/furniture/furniture.controller';
import { FurnitureService } from '~/src/furniture/furniture.service';
import { status } from '@prisma/client';

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
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      id_type: faker.number.int({ min: 1, max: 5 }),
      size: faker.helpers.arrayElement(['S', 'M', 'L']),
      colour: faker.color.human(),
      quantity: faker.number.int({ min: 1, max: 100 }),
      price: parseFloat(faker.commerce.price({ min: 10, max: 300, dec: 2 })),
      status: status.AVAILABLE,
    };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    const items = [faker.commerce.productName(), faker.commerce.productName()];
    service.findAll.mockResolvedValue(items);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(items);
  });

  it('should call service.findOne on findOne()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    service.findOne.mockResolvedValue('furniture');
    const result = await controller.findOne(id.toString());
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toBe('furniture');
  });

  it('should call service.update on update()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    const dto = { name: faker.commerce.productName() };
    service.update.mockResolvedValue('updated');
    const result = await controller.update(id.toString(), dto as any);
    expect(service.update).toHaveBeenCalledWith(id, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove(id.toString());
    expect(service.remove).toHaveBeenCalledWith(id);
    expect(result).toBe('deleted');
  });
});
