// src\user\user.controller.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '~/src/user/user.controller';
import { UserService } from '~/src/user/user.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = {
      user_name: faker.person.firstName().toLowerCase(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['admin', 'customer', 'user']),
    };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    const fakeUsers = [faker.person.firstName(), faker.person.firstName()];
    service.findAll.mockResolvedValue(fakeUsers);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeUsers);
  });

  it('should call service.findOne on findOne()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    service.findOne.mockResolvedValue('found');
    const result = await controller.findOne(id.toString());
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toBe('found');
  });

  it('should call service.update on update()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    const dto = { password: faker.internet.password() };
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
