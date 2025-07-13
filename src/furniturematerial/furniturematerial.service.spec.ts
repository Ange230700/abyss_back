// src\furniturematerial\furniturematerial.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FurniturematerialService } from '~/src/furniturematerial/furniturematerial.service';
import { PrismaService } from '~/src/prisma/prisma.service';

const prismaMock = {
  furniturematerial: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('FurniturematerialService', () => {
  let service: FurniturematerialService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FurniturematerialService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<FurniturematerialService>(FurniturematerialService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create furniturematerial', async () => {
    const dto = { id_furniture: 1, id_material: 2 };
    const created = { id: 10, ...dto, deleted_at: null };
    prisma.furniturematerial.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.furniturematerial.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all furniturematerial', async () => {
    const data = [{ id: 1 }, { id: 2 }];
    prisma.furniturematerial.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.furniturematerial.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one furniturematerial by id', async () => {
    prisma.furniturematerial.findUnique.mockResolvedValue({ id: 3 });
    const result = await service.findOne(3);
    expect(prisma.furniturematerial.findUnique).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(result).toEqual({ id: 3 });
  });

  it('should update furniturematerial', async () => {
    const updateData = { id_furniture: 2 };
    const updated = { id: 4, id_furniture: 2 };
    prisma.furniturematerial.update.mockResolvedValue(updated);

    const result = await service.update(4, updateData as any);
    expect(prisma.furniturematerial.update).toHaveBeenCalledWith({
      where: { id: 4 },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete furniturematerial', async () => {
    const now = new Date();
    const deleted = { id: 5, deleted_at: now };
    prisma.furniturematerial.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(5);
    expect(prisma.furniturematerial.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
