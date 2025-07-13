// src\user\user.controller.spec.ts

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
      user_name: 'jane',
      email: 'jane@example.com',
      password: 'pw',
      role: 'admin',
    };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['user1', 'user2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['user1', 'user2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('found');
    const result = await controller.findOne('10');
    expect(service.findOne).toHaveBeenCalledWith(10);
    expect(result).toBe('found');
  });

  it('should call service.update on update()', async () => {
    const dto = { password: 'updated' };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('3', dto as any);
    expect(service.update).toHaveBeenCalledWith(3, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('11');
    expect(service.remove).toHaveBeenCalledWith(11);
    expect(result).toBe('deleted');
  });
});
