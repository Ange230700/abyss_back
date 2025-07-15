// tests\image.e2e-spec.ts

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';
import { status } from '@prisma/client';

describe('ImageController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;
  let id_furniture: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    // Create a furniture for FK relation
    const furnitureRes = await request(app.getHttpServer())
      .post('/furnitures')
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        id_type: 1,
        size: 'Medium',
        colour: faker.color.human(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
        status: status.AVAILABLE,
      });
    expect(furnitureRes.status).toBe(201);
    id_furniture = furnitureRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /images - should create an image', async () => {
    const url = faker.image.urlPicsumPhotos({ width: 400, height: 300 });
    const res = await request(app.getHttpServer()).post('/images').send({
      id_furniture,
      url,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id_furniture).toBe(id_furniture);
    expect(res.body.url).toBe(url);
    createdId = res.body.id;
  });

  it('GET /images - should return array of images', async () => {
    const res = await request(app.getHttpServer()).get('/images');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((img: any) => img.id === createdId)).toBeDefined();
  });

  it('GET /images/:id - should return one image', async () => {
    const res = await request(app.getHttpServer()).get(`/images/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body).toHaveProperty('url');
  });

  it('PATCH /images/:id - should update the image', async () => {
    const newUrl = faker.image.urlPicsumPhotos({ width: 500, height: 500 });
    const res = await request(app.getHttpServer())
      .patch(`/images/${createdId}`)
      .send({ url: newUrl });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.url).toBe(newUrl);
  });

  it('DELETE /images/:id - should soft delete the image', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/images/${createdId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.deleted_at).toBeDefined();
  });

  it('GET /images/:id - should return soft-deleted image (with deleted_at)', async () => {
    const res = await request(app.getHttpServer()).get(`/images/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('deleted_at');
  });
});
