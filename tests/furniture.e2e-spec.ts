// tests\furniture.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';
import { faker } from '@faker-js/faker';
import { status } from '@prisma/client';

// Dummy values for dependencies (id_type must reference an existing furnituretype!)
const FURNITURE_TYPE_ID = 1;

const baseFurniture = {
  name: faker.commerce.productName(), // e.g. "Ergonomic Wooden Table"
  description: faker.commerce.productDescription(), // e.g. "A high-quality wooden table..."
  id_type: 1, // reference to an existing furnituretype
  size: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
  colour: faker.color.human(), // e.g. "Blue"
  quantity: faker.number.int({ min: 1, max: 100 }),
  price: parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 2 })),
  status: status.AVAILABLE,
  deleted_at: null,
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
  });

  it('GET /furnitures/:id → should return soft-deleted furniture with deleted_at', async () => {
    await request(app.getHttpServer())
      .get(`/furnitures/${createdId}`)
      .expect(404);
  });

  it('GET /furnitures → should NOT include soft-deleted item', async () => {
    const res = await request(app.getHttpServer())
      .get('/furnitures')
      .expect(200);

    expect(res.body.some((f: any) => f.id === createdId)).toBe(false);
  });
});
