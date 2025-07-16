// src\user\user.controller.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '~/src/user/user.controller';
import { UserService } from '~/src/user/user.service';
import { role } from '@prisma/client';

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
      role: role.customer,
    };
    const user = {
      id: faker.number.int(),
      user_name: dto.user_name,
      email: dto.email,
      role: dto.role,
      deleted_at: null,
    };
    service.create.mockResolvedValue({ ...user, password: 'hashed' });
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(user);
  });

  it('should call service.findAll on findAll()', async () => {
    const fakeUsers = [
      {
        id: faker.number.int(),
        user_name: faker.person.firstName().toLowerCase(),
        email: faker.internet.email(),
        role: role.customer,
        deleted_at: null,
        password: 'hidden',
      },
      {
        id: faker.number.int(),
        user_name: faker.person.firstName().toLowerCase(),
        email: faker.internet.email(),
        role: role.admin,
        deleted_at: null,
        password: 'hidden',
      },
    ];
    service.findAll.mockResolvedValue(fakeUsers);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeUsers.map(({ password, ...rest }) => rest));
  });

  it('should call service.findOne on findOne()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    const user = {
      id,
      user_name: faker.person.firstName().toLowerCase(),
      email: faker.internet.email(),
      role: role.customer,
      deleted_at: null,
      password: 'hidden',
    };
    service.findOne.mockResolvedValue(user);
    const result = await controller.findOne(id.toString());
    const { password, ...expected } = user;
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual(expected);
  });

  it('should call service.update on update()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    const dto = { password: faker.internet.password() };
    const user = {
      id,
      user_name: faker.person.firstName().toLowerCase(),
      email: faker.internet.email(),
      role: role.customer,
      deleted_at: null,
      password: 'hidden',
    };
    service.update.mockResolvedValue(user);
    const result = await controller.update(id.toString(), dto as any);
    const { password, ...expected } = user;
    expect(service.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(expected);
  });

  it('should call service.remove on remove()', async () => {
    const id = faker.number.int({ min: 1, max: 100 });
    const user = {
      id,
      user_name: faker.person.firstName().toLowerCase(),
      email: faker.internet.email(),
      role: role.customer,
      deleted_at: new Date(),
      password: 'hidden',
    };
    service.remove.mockResolvedValue(user);
    const result = await controller.remove(id.toString());
    const { password, ...expected } = user;
    expect(service.remove).toHaveBeenCalledWith(id);
    expect(result).toEqual(expected);
  });
});
