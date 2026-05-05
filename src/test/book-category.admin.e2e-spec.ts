import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import {createTestApp} from './utils/test-app';
// @ts-ignore 
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';
import * as argon2 from 'argon2';
// ts-ignore
describe('NewsCategoryControllerAdmin (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({app, dataSource} = await createTestApp());
    
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it("should create a news category", async () => {
    const res = await request(app.getHttpServer())
      .post('/admin/news-category')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({title: 'Tarix'})
      .expect(201);

    expect(res.body.id).toEqual(1);
    expect(res.body.title).toEqual('Tarix');
  })

  
});
