// tests\favorite.e2e-spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';
import { status } from '@prisma/client';

describe('FavoriteController (e2e)', () => {
  let app: INestApplication;
  let createdFavoriteId: number;
  let userId: number;
  let furnitureId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        user_name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
        role: 'customer',
      });
    userId = userRes.body.id;

    const furnitureRes = await request(app.getHttpServer())
      .post('/furnitures')
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        id_type: 1,
        size: 'Medium',
        colour: 'Blue',
        quantity: 5,
        price: 99.99,
        status: status.AVAILABLE,
      });
    furnitureId = furnitureRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /favorites → create', async () => {
    const favoriteDto = {
      id_furniture: furnitureId,
      id_user: userId,
      is_favorite: true,
    };
    const res = await request(app.getHttpServer())
      .post('/favorites')
      .send(favoriteDto);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id_furniture).toBe(favoriteDto.id_furniture);
    expect(res.body.is_favorite).toBe(true);
    createdFavoriteId = res.body.id;
  });

  it('GET /favorites → findAll', async () => {
    const res = await request(app.getHttpServer()).get('/favorites');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(
      res.body.find((f: { id: number }) => f.id === createdFavoriteId),
    ).toBeDefined();
  });

  it('GET /favorites/:id → findOne', async () => {
    const res = await request(app.getHttpServer()).get(
      `/favorites/${createdFavoriteId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdFavoriteId);
    expect(res.body).toHaveProperty('id_user', userId);
  });

  it('PATCH /favorites/:id → update', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/favorites/${createdFavoriteId}`)
      .send({ is_favorite: false });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('is_favorite', false);
  });

  it('DELETE /favorites/:id → soft delete', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/favorites/${createdFavoriteId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('deleted_at');
  });
});
