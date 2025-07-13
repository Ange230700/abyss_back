// src/favorite/favorite.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from '~/src/favorite/favorite.service';
import { PrismaService } from '~/src/prisma/prisma.service';

const prismaMock = {
  favorite: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('FavoriteService', () => {
  let service: FavoriteService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a favorite', async () => {
    const dto = { id_furniture: 1, id_user: 2, is_favorite: true };
    const created = { id: 10, ...dto, deleted_at: null };
    prisma.favorite.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.favorite.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all favorites', async () => {
    const favorites = [{ id: 1 }, { id: 2 }];
    prisma.favorite.findMany.mockResolvedValue(favorites);

    const result = await service.findAll();
    expect(prisma.favorite.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(favorites);
  });

  it('should find one favorite by id', async () => {
    prisma.favorite.findUnique.mockResolvedValue({ id: 1 });

    const result = await service.findOne(1);
    expect(prisma.favorite.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual({ id: 1 });
  });

  it('should update a favorite', async () => {
    const updated = { id: 1, is_favorite: false };
    prisma.favorite.update.mockResolvedValue(updated);

    const result = await service.update(1, { is_favorite: false } as any);
    expect(prisma.favorite.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { is_favorite: false },
    });
    expect(result).toBe(updated);
  });

  it('should soft delete a favorite', async () => {
    const now = new Date();
    const deleted = { id: 1, deleted_at: now };
    prisma.favorite.update.mockResolvedValue(deleted);

    // Mock Date so test is deterministic
    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(1);
    expect(prisma.favorite.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { deleted_at: now },
    });
    expect(result).toBe(deleted);

    (global.Date as any).mockRestore?.();
  });
});
