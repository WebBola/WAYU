import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request = require('supertest');
import {createTestApp} from './utils/test-app';
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';
import * as argon2 from 'argon2';

describe('NewsCategoryControllerAdmin (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({app, dataSource} = await createTestApp());
    let password = await argon2.hash('12345');
    await dataSource.query(`
      INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role", "password")
      VALUES ('Solih Coder', 'solihcoder@gmail.com', 'email', true, true, 'superAdmin', '${password}')
    `);
  });

  it(
    'POST /auth/sign-in -> should respond with a jwt token and 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({login: 'solihcoder@gmail.com', password: '12345'})
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
      jwtToken = res.body.accessToken;
    },
  );

  afterAll(async () => await teardownTestApp(app, dataSource));

  beforeEach(async () => {
    await dataSource.query('DELETE FROM news_category');
  });

  ////////// Create tests
  it('should return 401 when creating without token', async () => {
    await request(app.getHttpServer())
      .post('/admin/news-category')
      .send({title: 'Test Category'})
      .expect(401);
  });

  it('should return 201 when creating with valid token', async () => {
    const res = await request(app.getHttpServer())
      .post('/admin/news-category')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({title: 'Test Category'})
      .expect(201);

    expect(res.body.id).toEqual(1);
    expect(res.body.title).toEqual('Test Category');
  });

  ////////// Update tests
  
  it('should return 401 when updating without token', async () => {
    await dataSource.query(`
      INSERT INTO news_category (title, "createdAt", "updatedAt") 
      VALUES ('Test Category', NOW(), NOW())
    `);
    
    await request(app.getHttpServer())
      .patch('/admin/news-category/1')
      .send({name: 'Updated Category'})
      .expect(401);
  });

  it('should return 404 when updating non-existent category', async () => {
    await request(app.getHttpServer())
      .patch('/admin/news-category/678')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({name: 'Updated Category'})
      .expect(404);
  });

  it('should return 200 when updating with valid token', async () => {
    await dataSource.query(`
      INSERT INTO news_category (title, "createdAt", "updatedAt") 
      VALUES ('Test Category', NOW(), NOW())
    `);
    
    const res = await request(app.getHttpServer())
      .patch('/admin/news-category/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({name: 'Updated Category'})
      .expect(200);

    expect(res.body.id).toEqual(1);
    expect(res.body.name).toEqual('Updated Category');
  });

  ////////// Delete tests

  it('should return 401 when deleting without token', async () => {
    await dataSource.query(`
      INSERT INTO news_category (title, "createdAt", "updatedAt") 
      VALUES ('Category to Delete', NOW(), NOW())
    `);
    
    await request(app.getHttpServer())
      .delete('/admin/news-category/1')
      .expect(401);
  });

  it('should return 404 when deleting non-existent category', async () => {
    await request(app.getHttpServer())
      .delete('/admin/news-category/654')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('should return 200 when deleting with valid token', async () => {
    await dataSource.query(`
      INSERT INTO news_category (title, "createdAt", "updatedAt") 
      VALUES ('Category to Delete', NOW(), NOW())
    `);
    
    await request(app.getHttpServer())
      .delete('/admin/news-category/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });


});
