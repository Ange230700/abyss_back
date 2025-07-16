// tests\user.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';
import { faker } from '@faker-js/faker';
import { role } from '@prisma/client';

describe('UserController (e2e, CRUD lifecycle)', () => {
  let app: INestApplication;
  let userId: number;
  // Save fake user data for update checks
  let fakeUser: {
    user_name: string;
    email: string;
    password: string;
    role: role;
  };

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

  it('should create a user', async () => {
    fakeUser = {
      user_name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      role: role.customer,
    };

    const res = await request(app.getHttpServer())
      .post('/users')
      .send(fakeUser);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      user_name: fakeUser.user_name,
      email: fakeUser.email,
      role: fakeUser.role,
    });
    expect(res.body).toHaveProperty('id');
    expect(res.body).not.toHaveProperty('password');
    userId = res.body.id;
  });

  it('should get all users (user should be in the list)', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((u: any) => u.id === userId)).toBe(true);
  });

  it('should get the created user by id', async () => {
    const res = await request(app.getHttpServer()).get(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: userId,
      user_name: fakeUser.user_name,
      email: fakeUser.email,
      role: fakeUser.role,
    });
  });

  it('should update the user', async () => {
    const newEmail = faker.internet.email();
    const updateRes = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send({ email: newEmail });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty('email', newEmail);
    // Update our in-memory reference for next test
    fakeUser.email = newEmail;
  });

  it('should delete the user', async () => {
    const deleteRes = await request(app.getHttpServer()).delete(
      `/users/${userId}`,
    );
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('id', userId);

    // Ensure user is now gone
    const getRes = await request(app.getHttpServer()).get(`/users/${userId}`);
    expect(getRes.status).toBe(404);
    expect(getRes.body).toMatchObject({
      statusCode: 404,
      message: expect.any(String),
      error: 'Not Found',
    });
  });
});
