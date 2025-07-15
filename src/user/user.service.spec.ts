// src\user\user.service.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '~/src/user/user.service';
import { PrismaService } from '~/src/prisma/prisma.service';

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
      role: faker.helpers.arrayElement(['admin', 'customer', 'user']),
    };
    const created = { id: faker.number.int(), ...dto };
    prisma.user.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
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
    const deleted = { id };
    prisma.user.delete.mockResolvedValue(deleted);

    const result = await service.remove(id);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(deleted);
  });
});
