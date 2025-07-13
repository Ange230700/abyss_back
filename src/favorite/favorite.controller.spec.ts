// src/favorite/favorite.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('FavoriteController', () => {
  let controller: FavoriteController;
  let service: typeof serviceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [{ provide: FavoriteService, useValue: serviceMock }],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
    service = module.get(FavoriteService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto = { id_furniture: 1, id_user: 2, is_favorite: true };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    service.findAll.mockResolvedValue(['fav1', 'fav2']);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(['fav1', 'fav2']);
  });

  it('should call service.findOne on findOne()', async () => {
    service.findOne.mockResolvedValue('fav');
    const result = await controller.findOne('12');
    expect(service.findOne).toHaveBeenCalledWith(12);
    expect(result).toBe('fav');
  });

  it('should call service.update on update()', async () => {
    const dto = { is_favorite: false };
    service.update.mockResolvedValue('updated');
    const result = await controller.update('7', dto as any);
    expect(service.update).toHaveBeenCalledWith(7, dto);
    expect(result).toBe('updated');
  });

  it('should call service.remove on remove()', async () => {
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove('5');
    expect(service.remove).toHaveBeenCalledWith(5);
    expect(result).toBe('deleted');
  });
});
