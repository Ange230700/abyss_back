// src\furnituretype\furnituretype.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FurnituretypeService } from '~/src/furnituretype/furnituretype.service';
import { PrismaService } from '~/src/prisma/prisma.service';

const prismaMock = {
  furnituretype: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('FurnituretypeService', () => {
  let service: FurnituretypeService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FurnituretypeService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<FurnituretypeService>(FurnituretypeService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a furnituretype', async () => {
    const dto = { name: 'Desk' };
    const created = { id: 1, ...dto, deleted_at: null };
    prisma.furnituretype.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.furnituretype.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all furnituretypes', async () => {
    const data = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    prisma.furnituretype.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.furnituretype.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one furnituretype by id', async () => {
    prisma.furnituretype.findUnique.mockResolvedValue({ id: 3 });
    const result = await service.findOne(3);
    expect(prisma.furnituretype.findUnique).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(result).toEqual({ id: 3 });
  });

  it('should update a furnituretype', async () => {
    const updateData = { name: 'Updated' };
    const updated = { id: 4, name: 'Updated' };
    prisma.furnituretype.update.mockResolvedValue(updated);

    const result = await service.update(4, updateData as any);
    expect(prisma.furnituretype.update).toHaveBeenCalledWith({
      where: { id: 4 },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete a furnituretype', async () => {
    const now = new Date();
    const deleted = { id: 5, deleted_at: now };
    prisma.furnituretype.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(5);
    expect(prisma.furnituretype.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
