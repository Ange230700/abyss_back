// src\material\material.service.spec.ts

import { faker } from '@faker-js/faker';
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
    const dto = { name: faker.commerce.productMaterial() };
    const created = { id: faker.number.int(), ...dto, deleted_at: null };
    prisma.material.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.material.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all materials', async () => {
    const data = [
      { id: faker.number.int(), name: faker.commerce.productMaterial() },
      { id: faker.number.int(), name: faker.commerce.productMaterial() },
    ];
    prisma.material.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.material.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one material by id', async () => {
    const id = faker.number.int();
    const found = { id, name: faker.commerce.productMaterial() };
    prisma.material.findUnique.mockResolvedValue(found);
    const result = await service.findOne(id);
    expect(prisma.material.findUnique).toHaveBeenCalledWith({
      where: { id, deleted_at: null },
    });
    expect(result).toEqual(found);
  });

  it('should update a material', async () => {
    const id = faker.number.int();
    const updateData = { name: faker.commerce.productMaterial() };
    const updated = { id, ...updateData };
    prisma.material.update.mockResolvedValue(updated);

    const result = await service.update(id, updateData as any);
    expect(prisma.material.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete a material', async () => {
    const id = faker.number.int();
    const now = new Date();
    const deleted = { id, deleted_at: now };
    prisma.material.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(id);
    expect(prisma.material.update).toHaveBeenCalledWith({
      where: { id },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
