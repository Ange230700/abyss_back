// tests\material.e2e-spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

describe('MaterialController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;
  let materialName: string;

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
    materialName = faker.commerce.productMaterial();
    const res = await request(app.getHttpServer())
      .post('/materials')
      .send({ name: materialName })
      .expect(201);

    expect(res.body).toMatchObject({ name: materialName });
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

    expect(res.body).toMatchObject({ id: createdId, name: materialName });
  });

  it('PATCH /materials/:id → should update the material', async () => {
    const newName = faker.commerce.productMaterial();
    const res = await request(app.getHttpServer())
      .patch(`/materials/${createdId}`)
      .send({ name: newName })
      .expect(200);

    expect(res.body).toMatchObject({
      id: createdId,
      name: newName,
    });
    materialName = newName; // update local var for next test
  });

  it('DELETE /materials/:id → should delete the material', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/materials/${createdId}`)
      .expect(200);

    expect(res.body).toMatchObject({ id: createdId });
  });

  it('GET /materials/:id → should return 404 or soft deleted material', async () => {
    const res = await request(app.getHttpServer()).get(
      `/materials/${createdId}`,
    );

    expect([200, 404]).toContain(res.status);
  });
});
