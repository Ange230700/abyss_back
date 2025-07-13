// src\image\image.service.spec.ts

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
    const dto = { id_furniture: 1, url: 'https://picsum.photos/400/300' };
    const created = { id: 1, ...dto, deleted_at: null };
    prisma.image.create.mockResolvedValue(created);

    const result = await service.create(dto as any);
    expect(prisma.image.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(created);
  });

  it('should find all images', async () => {
    const data = [{ id: 1 }, { id: 2 }];
    prisma.image.findMany.mockResolvedValue(data);

    const result = await service.findAll();
    expect(prisma.image.findMany).toHaveBeenCalledWith({
      where: { deleted_at: null },
    });
    expect(result).toBe(data);
  });

  it('should find one image by id', async () => {
    prisma.image.findUnique.mockResolvedValue({ id: 3 });
    const result = await service.findOne(3);
    expect(prisma.image.findUnique).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(result).toEqual({ id: 3 });
  });

  it('should update an image', async () => {
    const updateData = { url: 'https://picsum.photos/300/200' };
    const updated = { id: 2, ...updateData };
    prisma.image.update.mockResolvedValue(updated);

    const result = await service.update(2, updateData as any);
    expect(prisma.image.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: updateData,
    });
    expect(result).toEqual(updated);
  });

  it('should soft delete an image', async () => {
    const now = new Date();
    const deleted = { id: 5, deleted_at: now };
    prisma.image.update.mockResolvedValue(deleted);

    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    const result = await service.remove(5);
    expect(prisma.image.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { deleted_at: now },
    });
    expect(result).toEqual(deleted);

    (global.Date as any).mockRestore?.();
  });
});
