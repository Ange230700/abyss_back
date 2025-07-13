// tests\user.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/src/app.module';

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
      user_name: 'e2e_test_user',
      email: 'e2e_test_user@example.com',
      password: 'passwordTest123',
      role: 'customer',
    };

    const res = await request(app.getHttpServer()).post('/users').send(dto);

    expect(res.status).toBe(201);
    // Vérifie présence des champs attendus
    expect(res.body).toMatchObject({
      user_name: dto.user_name,
      email: dto.email,
      role: dto.role,
    });
    expect(res.body).toHaveProperty('id');
    // Ne retourne jamais le password en clair normalement ! (à adapter selon ton code)
  });

  it('GET /users should return an array', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Optionnel : vérifier que le user créé plus haut est dedans
    expect(res.body.some((u: any) => u.user_name === 'e2e_test_user')).toBe(
      true,
    );
  });

  it('GET /users/:id should return a single user', async () => {
    // On crée d'abord un user pour être sûr d'avoir l'ID
    const createRes = await request(app.getHttpServer()).post('/users').send({
      user_name: 'e2e_test_user2',
      email: 'e2e_test_user2@example.com',
      password: 'pwtest',
      role: 'admin',
    });
    const id = createRes.body.id;
    expect(id).toBeDefined();

    const res = await request(app.getHttpServer()).get(`/users/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id, user_name: 'e2e_test_user2' });
  });

  it('PATCH /users/:id should update a user', async () => {
    // On crée d'abord un user pour être sûr d'avoir l'ID
    const createRes = await request(app.getHttpServer()).post('/users').send({
      user_name: 'e2e_patch_user',
      email: 'e2e_patch_user@example.com',
      password: 'patchpw',
      role: 'customer',
    });
    const id = createRes.body.id;

    const updateRes = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({
        email: 'updated_e2e_patch_user@example.com',
      });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty(
      'email',
      'updated_e2e_patch_user@example.com',
    );
  });

  it('DELETE /users/:id should delete a user', async () => {
    // On crée d'abord un user pour être sûr d'avoir l'ID
    const createRes = await request(app.getHttpServer()).post('/users').send({
      user_name: 'e2e_delete_user',
      email: 'e2e_delete_user@example.com',
      password: 'delpw',
      role: 'customer',
    });
    const id = createRes.body.id;

    const deleteRes = await request(app.getHttpServer()).delete(`/users/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('id', id);

    // Optionnel : Vérifier qu'il ne se trouve plus dans GET /users
    const getRes = await request(app.getHttpServer()).get(`/users/${id}`);
    // Selon ta logique, ça peut être 404 ou un user null/undefined
    expect(getRes.status).toBe(404);
    expect(getRes.body).toMatchObject({
      statusCode: 404,
      message: expect.any(String),
      error: 'Not Found',
    });
  });
});
