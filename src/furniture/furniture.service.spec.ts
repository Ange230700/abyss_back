// src/furniture/furniture.service.spec.ts

import { faker } from '@faker-js/faker';
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
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      id_type: faker.number.int({ min: 1, max: 5 }),
      size: faker.helpers.arrayElement(['S', 'M', 'L']),
      colour: faker.color.human(),
      quantity: faker.number.int({ min: 1, max: 100 }),
      price: parseFloat(faker.commerce.price({ min: 10, max: 300, dec: 2 })),
      status: 'Available',
    };
    const created = { id: faker.number.int(), ...dto, deleted_at: null };
    prisma.furniture.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.furniture.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all furniture', async () => {
    const data = [
      { id: faker.number.int(), name: faker.commerce.productName() },
      { id: faker.number.int(), name: faker.commerce.productName() },
    ];
    prisma.furniture.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.furniture.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one furniture by id', async () => {
    const id = faker.number.int();
    const found = { id };
    prisma.furniture.findUnique.mockResolvedValue(found);
    const result = await service.findOne(id);
    expect(prisma.furniture.findUnique).toHaveBeenCalledWith({
      where: { id, deleted_at: null },
    });
    expect(result).toEqual(found);
  });

  it('should update furniture', async () => {
    const id = faker.number.int();
    const newName = faker.commerce.productName();
    const updateData = { name: newName };
    const updated = { id, name: newName };
    prisma.furniture.update.mockResolvedValue(updated);

    const result = await service.update(id, updateData as any);
    expect(prisma.furniture.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete furniture', async () => {
    const id = faker.number.int();
    const now = new Date();
    const deleted = { id, deleted_at: now };
    prisma.furniture.update.mockResolvedValue(deleted);
    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(id);
    expect(prisma.furniture.update).toHaveBeenCalledWith({
      where: { id },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
