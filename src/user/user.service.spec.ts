// src\user\user.service.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '~/src/user/user.service';
import { PrismaService } from '~/src/prisma/prisma.service';
import { role } from '@prisma/client';
import * as argon2 from 'argon2';

const prismaMock = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      user_name: faker.person.firstName().toLowerCase(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: role.customer,
    };
    let capturedData: any;
    prisma.user.create.mockImplementation(async ({ data }) => {
      capturedData = data;
      return { id: faker.number.int(), ...data };
    });

    await service.create(dto as any);

    expect(capturedData.password).not.toBe(dto.password); // password is hashed
    expect(await argon2.verify(capturedData.password, dto.password)).toBe(true); // hash is valid
  });

  it('should find all users', async () => {
    const users = [
      { id: faker.number.int(), user_name: faker.person.firstName() },
      { id: faker.number.int(), user_name: faker.person.firstName() },
    ];
    prisma.user.findMany.mockResolvedValue(users);

    const result = await service.findAll();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result).toBe(users);
  });

  it('should find a user by id', async () => {
    const id = faker.number.int();
    const found = { id, user_name: faker.person.firstName() };
    prisma.user.findUnique.mockResolvedValue(found);
    const result = await service.findOne(id);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id, deleted_at: null },
    });
    expect(result).toEqual(found);
  });

  it('should update a user', async () => {
    const id = faker.number.int();
    const updateData = { email: faker.internet.email() };
    const updated = { id, ...updateData };
    prisma.user.update.mockResolvedValue(updated);

    const result = await service.update(id, updateData as any);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should delete a user', async () => {
    const id = faker.number.int();
    const deleted = {
      id,
      user_name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: role.customer,
      deleted_at: new Date(),
    };
    prisma.user.update.mockResolvedValue(deleted);

    const result = await service.remove(id);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id },
      data: { deleted_at: expect.any(Date) },
    });
    expect(result).toEqual(deleted);
  });
});
