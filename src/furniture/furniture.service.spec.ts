// src/furniture/furniture.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FurnitureService } from '~/src/furniture/furniture.service';
import { PrismaService } from '~/src/prisma/prisma.service';

const prismaMock = {
  furniture: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('FurnitureService', () => {
  let service: FurnitureService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FurnitureService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<FurnitureService>(FurnitureService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create furniture', async () => {
    const dto = {
      name: 'Chair',
      description: 'desc',
      id_type: 1,
      size: 'L',
      colour: 'Red',
      quantity: 5,
      price: 100,
      status: 'Available',
    };
    const created = { id: 1, ...dto, deleted_at: null };
    prisma.furniture.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.furniture.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all furniture', async () => {
    const data = [{ id: 1 }, { id: 2 }];
    prisma.furniture.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.furniture.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one furniture by id', async () => {
    prisma.furniture.findUnique.mockResolvedValue({ id: 2 });
    const result = await service.findOne(2);
    expect(prisma.furniture.findUnique).toHaveBeenCalledWith({
      where: { id: 2 },
    });
    expect(result).toEqual({ id: 2 });
  });

  it('should update furniture', async () => {
    prisma.furniture.update.mockResolvedValue({ id: 3, name: 'Updated' });
    const result = await service.update(3, { name: 'Updated' } as any);
    expect(prisma.furniture.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { name: 'Updated' },
    });
    expect(result).toEqual({ id: 3, name: 'Updated' });
  });

  it('should soft delete furniture', async () => {
    const now = new Date();
    prisma.furniture.update.mockResolvedValue({ id: 1, deleted_at: now });
    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(1);
    expect(prisma.furniture.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { deleted_at: now },
    });
    expect(result).toEqual({ id: 1, deleted_at: now });

    (global.Date as any).mockRestore?.();
  });
});
