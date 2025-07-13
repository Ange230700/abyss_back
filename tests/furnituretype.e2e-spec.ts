// tests\furnituretype.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

describe('FurnituretypeController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /furniture-types → 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/furniture-types')
      .send({ name: 'TestType' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('TestType');
    createdId = res.body.id;
  });

  it('GET /furniture-types → 200', async () => {
    const res = await request(app.getHttpServer()).get('/furniture-types');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // optionnel : vérifier que notre type créé est dans la liste
    expect(
      res.body.some((ft: any) => ft.id === createdId && ft.name === 'TestType'),
    ).toBe(true);
  });

  it('GET /furniture-types/:id → 200', async () => {
    const res = await request(app.getHttpServer()).get(
      `/furniture-types/${createdId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('name', 'TestType');
  });

  it('PATCH /furniture-types/:id → 200', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/furniture-types/${createdId}`)
      .send({ name: 'TypeModifié' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('TypeModifié');
  });

  it('DELETE /furniture-types/:id → 200', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/furniture-types/${createdId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('deleted_at');
  });

  it('GET /furniture-types/:id après soft delete → 200, deleted_at non null', async () => {
    const res = await request(app.getHttpServer()).get(
      `/furniture-types/${createdId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.deleted_at).not.toBeNull();
  });

  it('GET /furniture-types (après soft delete) ne doit plus contenir ce type', async () => {
    const res = await request(app.getHttpServer()).get('/furniture-types');
    expect(res.status).toBe(200);
    // Optionnel : il se peut que le soft delete l’exclue du findAll
    expect(res.body.some((ft: any) => ft.id === createdId)).toBe(false);
  });
});
