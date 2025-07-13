// src\image\image.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from '~/src/image/image.controller';
import { ImageService } from '~/src/image/image.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ImageController', () => {
  let controller: ImageController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [{ provide: ImageService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ImageController>(ImageController);
    service = module.get(ImageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = { id_furniture: 1, url: 'https://example.com' };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['img1', 'img2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['img1', 'img2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('found');
    const result = await controller.findOne('9');
    expect(service.findOne).toHaveBeenCalledWith(9);
    expect(result).toBe('found');
  });

  it('should call service.update on update()', async () => {
    const dto = { url: 'updated' };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('4', dto as any);
    expect(service.update).toHaveBeenCalledWith(4, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('10');
    expect(service.remove).toHaveBeenCalledWith(10);
    expect(result).toBe('deleted');
  });
});
