// tests\image.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

describe('ImageController (e2e)', () => {
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

  it('POST /images - should create an image', async () => {
    const res = await request(app.getHttpServer()).post('/images').send({
      id_furniture: 1,
      url: 'https://picsum.photos/400/300',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id_furniture).toBe(1);
    expect(res.body.url).toBe('https://picsum.photos/400/300');
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
    const res = await request(app.getHttpServer())
      .patch(`/images/${createdId}`)
      .send({ url: 'https://example.com/img.png' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdId);
    expect(res.body.url).toBe('https://example.com/img.png');
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
