// src\user\user.service.spec.ts

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
      user_name: 'john',
      email: 'john@example.com',
      password: 'abc',
      role: 'customer',
    };
    const created = { id: 1, ...dto };
    prisma.user.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all users', async () => {
    const users = [{ id: 1 }, { id: 2 }];
    prisma.user.findMany.mockResolvedValue(users);

    const result = await service.findAll();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result).toBe(users);
  });

  it('should find a user by id', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 3 });
    const result = await service.findOne(3);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(result).toEqual({ id: 3 });
  });

  it('should update a user', async () => {
    const updateData = { email: 'new@example.com' };
    const updated = { id: 2, email: 'new@example.com' };
    prisma.user.update.mockResolvedValue(updated);

    const result = await service.update(2, updateData as any);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should delete a user', async () => {
    const deleted = { id: 5 };
    prisma.user.delete.mockResolvedValue(deleted);

    const result = await service.remove(5);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(result).toEqual(deleted);
  });
});
