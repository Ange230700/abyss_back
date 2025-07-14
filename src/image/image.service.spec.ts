// src\image\image.service.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '~/src/image/image.service';
import { PrismaService } from '~/src/prisma/prisma.service';

const prismaMock = {
  image: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('ImageService', () => {
  let service: ImageService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an image', async () => {
    const dto = {
      id_furniture: faker.number.int({ min: 1, max: 20 }),
      url: faker.image.url(),
    };
    const created = { id: faker.number.int(), ...dto, deleted_at: null };
    prisma.image.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.image.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all images', async () => {
    const data = [
      { id: faker.number.int(), url: faker.image.url() },
      { id: faker.number.int(), url: faker.image.url() },
    ];
    prisma.image.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.image.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one image by id', async () => {
    const id = faker.number.int();
    const found = { id, url: faker.image.url() };
    prisma.image.findUnique.mockResolvedValue(found);
    const result = await service.findOne(id);
    expect(prisma.image.findUnique).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(found);
  });

  it('should update an image', async () => {
    const id = faker.number.int();
    const updateData = { url: faker.image.url() };
    const updated = { id, ...updateData };
    prisma.image.update.mockResolvedValue(updated);

    const result = await service.update(id, updateData as any);
    expect(prisma.image.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete an image', async () => {
    const id = faker.number.int();
    const now = new Date();
    const deleted = { id, deleted_at: now };
    prisma.image.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(id);
    expect(prisma.image.update).toHaveBeenCalledWith({
      where: { id },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
