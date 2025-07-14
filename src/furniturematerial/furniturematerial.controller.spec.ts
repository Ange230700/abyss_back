// src\furniturematerial\furniturematerial.controller.spec.ts

import { faker } from '@faker-js/faker';
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
    const dto = {
      id_furniture: faker.number.int({ min: 1, max: 20 }),
      id_material: faker.number.int({ min: 1, max: 20 }),
    };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    const fakeArray = [faker.word.noun(), faker.word.noun()];
    service.findAll.mockResolvedValue(fakeArray);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeArray);
  });

  it('should call service.findOne on findOne()', async () => {
    const id = faker.number.int({ min: 1, max: 999 });
    service.findOne.mockResolvedValue('one');
    const result = await controller.findOne(id.toString());
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toBe('one');
  });

  it('should call service.update on update()', async () => {
    const id = faker.number.int({ min: 1, max: 999 });
    const dto = { id_furniture: faker.number.int({ min: 1, max: 20 }) };
    service.update.mockResolvedValue('updated');
    const result = await controller.update(id.toString(), dto as any);
    expect(service.update).toHaveBeenCalledWith(id, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    const id = faker.number.int({ min: 1, max: 999 });
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove(id.toString());
    expect(service.remove).toHaveBeenCalledWith(id);
    expect(result).toBe('deleted');
  });
});
