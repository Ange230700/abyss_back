// src/favorite/favorite.controller.spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteController } from '~/src/favorite/favorite.controller';
import { FavoriteService } from '~/src/favorite/favorite.service';
import { FavoriteResponseDto } from '~/src/favorite/dto/favorite-response.dto';

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
    const dto = {
      id_furniture: faker.number.int({ min: 1, max: 100 }),
      id_user: faker.number.int({ min: 1, max: 100 }),
      is_favorite: faker.datatype.boolean(),
    };
    service.create.mockResolvedValue('created');
    const result = await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe('created');
  });

  it('should call service.findAll on findAll()', async () => {
    const favoritesArray = [
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
    service.findAll.mockResolvedValue(favoritesArray);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(favoritesArray);
  });

  it('should call service.findOne on findOne()', async () => {
    const favId = faker.number.int();
    const favorite = {
      id: favId,
      id_furniture: faker.number.int(),
      id_user: faker.number.int(),
      is_favorite: true,
    };
    service.findOne.mockResolvedValue(favorite);
    const result = await controller.findOne(favId.toString());
    expect(service.findOne).toHaveBeenCalledWith(favId);
    expect(result).toBeInstanceOf(FavoriteResponseDto);
    expect(result).toEqual(favorite);
  });

  it('should call service.update on update()', async () => {
    const favId = faker.number.int();
    const dto = { is_favorite: faker.datatype.boolean() };
    const updated = { id: favId, ...dto };
    service.update.mockResolvedValue(updated);
    const result = await controller.update(favId.toString(), dto as any);
    expect(service.update).toHaveBeenCalledWith(favId, dto);
    expect(result).toBe(updated);
  });

  it('should call service.remove on remove()', async () => {
    const favId = faker.number.int();
    service.remove.mockResolvedValue('deleted');
    const result = await controller.remove(favId.toString());
    expect(service.remove).toHaveBeenCalledWith(favId);
    expect(result).toBe('deleted');
  });
});
