// tests\favorite.e2e-spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

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
    // Ajout du pipe de validation si tu l'utilises en prod
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    // 1. Create a user
    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        user_name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
        role: 'customer',
      });
    userId = userRes.body.id;

    // 2. Create furniture
    const furnitureRes = await request(app.getHttpServer())
      .post('/furnitures')
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        id_type: 1, // or another valid type
        size: 'Medium',
        colour: 'Blue',
        quantity: 5,
        price: 99.99,
        status: 'Available',
      });
    furnitureId = furnitureRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /favorite → create', async () => {
    const favoriteDto = {
      id_furniture: furnitureId,
      id_user: userId,
      is_favorite: true,
    };
    const res = await request(app.getHttpServer())
      .post('/favorite')
      .send(favoriteDto);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id_furniture).toBe(favoriteDto.id_furniture);
    expect(res.body.is_favorite).toBe(true);
    createdFavoriteId = res.body.id;
  });

  it('GET /favorite → findAll', async () => {
    const res = await request(app.getHttpServer()).get('/favorite');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Optionnel: tu peux vérifier que l'élément créé est présent
    expect(
      res.body.find((f: { id: number }) => f.id === createdFavoriteId),
    ).toBeDefined();
  });

  it('GET /favorite/:id → findOne', async () => {
    const res = await request(app.getHttpServer()).get(
      `/favorite/${createdFavoriteId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdFavoriteId);
    expect(res.body).toHaveProperty('id_user', userId);
  });

  it('PATCH /favorite/:id → update', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/favorite/${createdFavoriteId}`)
      .send({ is_favorite: false });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('is_favorite', false);
  });

  it('DELETE /favorite/:id → soft delete', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/favorite/${createdFavoriteId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('deleted_at');
  });
});
