// tests\user.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';
import { faker } from '@faker-js/faker';
import { role } from '@prisma/client';

describe('UserController (e2e)', () => {
  let app: INestApplication;

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

  it('POST /users should create a new user', async () => {
    const dto = {
      user_name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      role: role.customer,
    };

    const res = await request(app.getHttpServer()).post('/users').send(dto);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      user_name: dto.user_name,
      email: dto.email,
      role: dto.role,
    });
    expect(res.body).toHaveProperty('id');
  });

  it('GET /users should return an array', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((u: any) => u.user_name === 'e2e_test_user')).toBe(
      true,
    );
  });

  it('GET /users/:id should return a single user', async () => {
    const user_name = faker.internet.username();
    const email = faker.internet.email();
    const password = faker.internet.password({ length: 12 });

    const createRes = await request(app.getHttpServer()).post('/users').send({
      user_name,
      email,
      password,
      role: role.admin,
    });
    const id = createRes.body.id;
    expect(id).toBeDefined();

    const res = await request(app.getHttpServer()).get(`/users/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id, user_name });
  });

  it('PATCH /users/:id should update a user', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        user_name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
        role: role.customer,
      });
    const id = createRes.body.id;

    const newEmail = faker.internet.email();
    const updateRes = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({
        email: newEmail,
      });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty('email', newEmail);
  });

  it('DELETE /users/:id should delete a user', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        user_name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12 }),
        role: role.customer,
      });
    const id = createRes.body.id;

    const deleteRes = await request(app.getHttpServer()).delete(`/users/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('id', id);

    const getRes = await request(app.getHttpServer()).get(`/users/${id}`);
    expect(getRes.status).toBe(404);
    expect(getRes.body).toMatchObject({
      statusCode: 404,
      message: expect.any(String),
      error: 'Not Found',
    });
  });
});
