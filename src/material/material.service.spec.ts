// src\material\material.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { MaterialService } from '~/src/material/material.service';
import { PrismaService } from '~/src/prisma/prisma.service';

const prismaMock = {
  material: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('MaterialService', () => {
  let service: MaterialService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MaterialService>(MaterialService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a material', async () => {
    const dto = { name: 'Wood' };
    const created = { id: 1, ...dto, deleted_at: null };
    prisma.material.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.material.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all materials', async () => {
    const data = [{ id: 1 }, { id: 2 }];
    prisma.material.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.material.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one material by id', async () => {
    prisma.material.findUnique.mockResolvedValue({ id: 3 });
    const result = await service.findOne(3);
    expect(prisma.material.findUnique).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(result).toEqual({ id: 3 });
  });

  it('should update a material', async () => {
    const updateData = { name: 'Steel' };
    const updated = { id: 2, name: 'Steel' };
    prisma.material.update.mockResolvedValue(updated);

    const result = await service.update(2, updateData as any);
    expect(prisma.material.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete a material', async () => {
    const now = new Date();
    const deleted = { id: 5, deleted_at: now };
    prisma.material.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(5);
    expect(prisma.material.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
