// tests\users.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

// Utilitaire simple pour un utilisateur de test
const testUser = {
  user_name: 'johndoe',
  email: 'john.e2e@example.com',
  password: 'test1234',
  role: 'customer', // adapte selon l'enum si besoin
};

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Si tu utilises class-validator dans les DTOs
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users - should create a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toMatchObject({
      user_name: testUser.user_name,
      email: testUser.email,
      role: testUser.role,
    });
    createdUserId = res.body.id;
  });

  it('GET /users - should return user list (at least one)', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((u: any) => u.id === createdUserId)).toBeTruthy();
  });

  it('GET /users/:id - should return the created user', async () => {
    const res = await request(app.getHttpServer()).get(
      `/users/${createdUserId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: createdUserId,
      user_name: testUser.user_name,
      email: testUser.email,
      role: testUser.role,
    });
  });

  it('PATCH /users/:id - should update the user', async () => {
    const newEmail = 'john.updated.e2e@example.com';
    const res = await request(app.getHttpServer())
      .patch(`/users/${createdUserId}`)
      .send({ email: newEmail });
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(newEmail);
  });

  it('DELETE /users/:id - should delete the user', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/users/${createdUserId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdUserId);
  });

  it('GET /users/:id - should return null or 404 after delete', async () => {
    const res = await request(app.getHttpServer()).get(
      `/users/${createdUserId}`,
    );
    // Selon ton service, adapte ce test (404 ou null/undefined)
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toBeNull();
    }
  });
});
