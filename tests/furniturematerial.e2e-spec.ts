// tests\furniturematerial.e2e-spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';
import { status } from '@prisma/client';

describe('FurniturematerialController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;
  let id_furniture: number;
  let id_material: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    const sizesList = ['Small', 'Medium', 'Large'];

    // 1. Create FURNITURE and MATERIAL before tests
    const furnitureRes = await request(app.getHttpServer())
      .post('/furnitures')
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        id_type: faker.number.int({ min: 1, max: 5 }),
        size: faker.helpers.arrayElement(sizesList),
        colour: faker.color.human(),
        quantity: faker.number.int({ min: 1, max: 20 }),
        price: parseFloat(faker.commerce.price({ min: 10, max: 300, dec: 2 })),
        status: status.AVAILABLE,
        deleted_at: null,
      });
    expect(furnitureRes.status).toBe(201); // <--- add this
    expect(furnitureRes.body).toHaveProperty('id');
    id_furniture = furnitureRes.body.id;

    const materialRes = await request(app.getHttpServer())
      .post('/materials')
      .send({
        name: faker.commerce.productMaterial(),
        deleted_at: null,
      });
    expect(materialRes.status).toBe(201); // <--- add this
    expect(materialRes.body).toHaveProperty('id');
    id_material = materialRes.body.id;

    if (!id_furniture || !id_material) {
      throw new Error('Could not create furniture or material for tests');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /furniture-materials → should create', async () => {
    const testFurnitureMaterial = { id_furniture, id_material };
    const res = await request(app.getHttpServer())
      .post('/furniture-materials')
      .send(testFurnitureMaterial);

    expect(res.status).toBe(201);

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
    expect(res.body).toMatchObject({
      id_furniture,
      id_material,
    });
  });

  it('PATCH /furniture-materials/:id → should update', async () => {
    // Create a new material for the update
    const materialRes = await request(app.getHttpServer())
      .post('/materials')
      .send({
        name: faker.commerce.productMaterial(),
        deleted_at: null,
      });
    const newMaterialId = materialRes.body.id;

    const update = { id_material: newMaterialId };
    const res = await request(app.getHttpServer())
      .patch(`/furniture-materials/${createdId}`)
      .send(update)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.id_material).toBe(newMaterialId);
  });

  it('DELETE /furniture-materials/:id → should soft delete', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/furniture-materials/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('deleted_at');
  });
});
