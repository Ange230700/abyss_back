// src/favorite/favorite.service.spec.ts

import { faker } from '@faker-js/faker';
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
    const dto = {
      id_furniture: faker.number.int({ min: 1, max: 1000 }),
      id_user: faker.number.int({ min: 1, max: 1000 }),
      is_favorite: faker.datatype.boolean(),
    };
    const created = {
      id: faker.number.int({ min: 1, max: 1000 }),
      ...dto,
      deleted_at: null,
    };
    prisma.favorite.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.favorite.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all favorites', async () => {
    const favorites = [
      {
        id: faker.number.int(),
        id_furniture: faker.number.int(),
        id_user: faker.number.int(),
        is_favorite: true,
      },
      {
        id: faker.number.int(),
        id_furniture: faker.number.int(),
        id_user: faker.number.int(),
        is_favorite: false,
      },
    ];
    prisma.favorite.findMany.mockResolvedValue(favorites);

    const result = await service.findAll();
    expect(prisma.favorite.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(favorites);
  });

  it('should find one favorite by id', async () => {
    const favoriteId = faker.number.int();
    const favorite = {
      id: favoriteId,
      id_furniture: faker.number.int(),
      id_user: faker.number.int(),
      is_favorite: faker.datatype.boolean(),
    };
    prisma.favorite.findUnique.mockResolvedValue(favorite);

    const result = await service.findOne(favoriteId);
    expect(prisma.favorite.findUnique).toHaveBeenCalledWith({
      where: { id: favoriteId },
    });
    expect(result).toEqual(favorite);
  });

  it('should update a favorite', async () => {
    const favoriteId = faker.number.int();
    const updateData = { is_favorite: faker.datatype.boolean() };
    const updated = {
      id: favoriteId,
      ...updateData,
    };
    prisma.favorite.update.mockResolvedValue(updated);

    const result = await service.update(favoriteId, updateData as any);
    expect(prisma.favorite.update).toHaveBeenCalledWith({
      where: { id: favoriteId },
      data: updateData,
    });
    expect(result).toBe(updated);
  });

  it('should soft delete a favorite', async () => {
    const favoriteId = faker.number.int();
    const now = new Date();
    const deleted = { id: favoriteId, deleted_at: now };
    prisma.favorite.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(favoriteId);
    expect(prisma.favorite.update).toHaveBeenCalledWith({
      where: { id: favoriteId },
      data: { deleted_at: now },
    });
    expect(result).toBe(deleted);

    (global.Date as any).mockRestore?.();
  });
});
