// tests\furniturematerial.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

// Utilise des valeurs fictives, à ajuster selon tes fixtures/dev DB
const testFurnitureMaterial = {
  id_furniture: 1,
  id_material: 1,
};

describe('FurniturematerialController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Utilisation du ValidationPipe pour simuler le comportement réel
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /furniture-materials → should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/furniture-materials')
      .send(testFurnitureMaterial)
      .expect(201);

    expect(res.body).toMatchObject(testFurnitureMaterial);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('GET /furniture-materials → should return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/furniture-materials')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(
      res.body.find((item: { id: number }) => item.id === createdId),
    ).toBeTruthy();
  });

  it('GET /furniture-materials/:id → should return created furniturematerial', async () => {
    const res = await request(app.getHttpServer())
      .get(`/furniture-materials/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toMatchObject(testFurnitureMaterial);
  });

  it('PATCH /furniture-materials/:id → should update', async () => {
    const update = { id_material: 2 };
    const res = await request(app.getHttpServer())
      .patch(`/furniture-materials/${createdId}`)
      .send(update)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.id_material).toBe(2);
  });

  it('DELETE /furniture-materials/:id → should soft delete', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/furniture-materials/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('deleted_at');
  });
});
