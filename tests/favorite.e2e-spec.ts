// tests\favorite.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

describe('FavoriteController (e2e)', () => {
  let app: INestApplication;
  let createdFavorite: any;

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /favorite → create', async () => {
    const res = await request(app.getHttpServer()).post('/favorite').send({
      id_furniture: 1,
      id_user: 1,
      is_favorite: true,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id_furniture).toBe(1);
    expect(res.body.is_favorite).toBe(true);
    createdFavorite = res.body;
  });

  it('GET /favorite → findAll', async () => {
    const res = await request(app.getHttpServer()).get('/favorite');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Optionnel: tu peux vérifier que l'élément créé est présent
    expect(
      res.body.find((f: { id: number }) => f.id === createdFavorite.id),
    ).toBeDefined();
  });

  it('GET /favorite/:id → findOne', async () => {
    const res = await request(app.getHttpServer()).get(
      `/favorite/${createdFavorite.id}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdFavorite.id);
    expect(res.body).toHaveProperty('id_user', 1);
  });

  it('PATCH /favorite/:id → update', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/favorite/${createdFavorite.id}`)
      .send({ is_favorite: false });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('is_favorite', false);
  });

  it('DELETE /favorite/:id → soft delete', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/favorite/${createdFavorite.id}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('deleted_at');
  });
});
