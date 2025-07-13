// tests\furniture.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

// Dummy values for dependencies (id_type must reference an existing furnituretype!)
const FURNITURE_TYPE_ID = 1;

const baseFurniture = {
  name: 'Test Chair',
  description: 'A comfy test chair',
  id_type: FURNITURE_TYPE_ID,
  size: 'Medium',
  colour: 'Blue',
  quantity: 5,
  price: 99.99,
  status: 'Available',
};

describe('FurnitureController (e2e)', () => {
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

  it('POST /furnitures → should create furniture', async () => {
    const res = await request(app.getHttpServer())
      .post('/furnitures')
      .send(baseFurniture)
      .expect(201);

    expect(res.body).toMatchObject({
      ...baseFurniture,
      id_type: FURNITURE_TYPE_ID,
    });
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('GET /furnitures → should return array and include created item', async () => {
    const res = await request(app.getHttpServer())
      .get('/furnitures')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((f: any) => f.id === createdId)).toBeDefined();
  });

  it('GET /furnitures/:id → should return created furniture', async () => {
    const res = await request(app.getHttpServer())
      .get(`/furnitures/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toMatchObject({ name: baseFurniture.name });
  });

  it('PATCH /furnitures/:id → should update furniture', async () => {
    const update = { colour: 'Green', quantity: 10 };
    const res = await request(app.getHttpServer())
      .patch(`/furnitures/${createdId}`)
      .send(update)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.colour).toBe('Green');
    expect(res.body.quantity).toBe(10);
  });

  it('DELETE /furnitures/:id → should soft delete the furniture', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/furnitures/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.deleted_at).toBeDefined();
  });

  it('GET /furnitures/:id → should return soft-deleted furniture with deleted_at', async () => {
    const res = await request(app.getHttpServer())
      .get(`/furnitures/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.deleted_at).toBeDefined();
  });

  it('GET /furnitures → should NOT include soft-deleted item', async () => {
    const res = await request(app.getHttpServer())
      .get('/furnitures')
      .expect(200);

    expect(res.body.some((f: any) => f.id === createdId)).toBe(false);
  });
});
