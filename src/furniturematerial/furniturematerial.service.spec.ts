// src\furniturematerial\furniturematerial.service.spec.ts

import { faker } from '@faker-js/faker';
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
    const dto = {
      id_furniture: faker.number.int({ min: 1, max: 20 }),
      id_material: faker.number.int({ min: 1, max: 20 }),
    };
    const created = { id: faker.number.int(), ...dto, deleted_at: null };
    prisma.furniturematerial.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.furniturematerial.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all furniturematerial', async () => {
    const data = [
      {
        id: faker.number.int(),
        id_furniture: faker.number.int(),
        id_material: faker.number.int(),
      },
      {
        id: faker.number.int(),
        id_furniture: faker.number.int(),
        id_material: faker.number.int(),
      },
    ];
    prisma.furniturematerial.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.furniturematerial.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
      include: { furniture: true, material: true },
    });
    expect(result).toBe(data);
  });

  it('should find one furniturematerial by id', async () => {
    const id = faker.number.int();
    const found = {
      id,
      id_furniture: faker.number.int(),
      id_material: faker.number.int(),
    };
    prisma.furniturematerial.findUnique.mockResolvedValue(found);
    const result = await service.findOne(id);
    expect(prisma.furniturematerial.findUnique).toHaveBeenCalledWith({
      where: { id, deleted_at: null },
    });
    expect(result).toEqual(found);
  });

  it('should update furniturematerial', async () => {
    const id = faker.number.int();
    const updateData = { id_furniture: faker.number.int({ min: 1, max: 20 }) };
    const updated = { id, ...updateData };
    prisma.furniturematerial.update.mockResolvedValue(updated);

    const result = await service.update(id, updateData as any);
    expect(prisma.furniturematerial.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete furniturematerial', async () => {
    const id = faker.number.int();
    const now = new Date();
    const deleted = { id, deleted_at: now };
    prisma.furniturematerial.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(id);
    expect(prisma.furniturematerial.update).toHaveBeenCalledWith({
      where: { id },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
