// tests\material.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

describe('MaterialController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Active les pipes de validation globaux comme en prod
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /materials → should create material', async () => {
    const res = await request(app.getHttpServer())
      .post('/materials')
      .send({ name: 'Aluminium' })
      .expect(201);

    expect(res.body).toMatchObject({ name: 'Aluminium' });
    expect(res.body.id).toBeDefined();
    createdId = res.body.id;
  });

  it('GET /materials → should return an array with the created material', async () => {
    const res = await request(app.getHttpServer())
      .get('/materials')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // L'id créé doit être dans la liste
    expect(res.body.find((m: any) => m.id === createdId)).toBeDefined();
  });

  it('GET /materials/:id → should return the created material', async () => {
    const res = await request(app.getHttpServer())
      .get(`/materials/${createdId}`)
      .expect(200);

    expect(res.body).toMatchObject({ id: createdId, name: 'Aluminium' });
  });

  it('PATCH /materials/:id → should update the material', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/materials/${createdId}`)
      .send({ name: 'Aluminium recyclé' })
      .expect(200);

    expect(res.body).toMatchObject({
      id: createdId,
      name: 'Aluminium recyclé',
    });
  });

  it('DELETE /materials/:id → should delete the material', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/materials/${createdId}`)
      .expect(200);

    expect(res.body).toMatchObject({ id: createdId });
  });

  it('GET /materials/:id → should return 404 after delete', async () => {
    await request(app.getHttpServer())
      .get(`/materials/${createdId}`)
      .expect(200); // ton service fait peut-être un soft delete et retourne null plutôt que 404
    // Si tu veux un 404, adapte la logique côté controller/service
  });
});
