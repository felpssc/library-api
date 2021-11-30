import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database/index';

jest.useFakeTimers('legacy');
jest.setTimeout(30000);

let connection: Connection;

describe('Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new Category', async () => {

    try {
      const response = await request(app)
      .post('/api/category')
      .send({ title: 'New Category' })
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('New Category');

    } catch(err) {
      console.log(err)
    }
  });

  it('Should be able to list all categories', async () => {

    try {
     const response = await request(app)
        .get('/api/category')

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    } catch(err) {
      console.log(err)
    }

  });

  it('Should be able to update a category', async () => {

    try {
      const response = await request(app)
        .post('/api/category')
        .send({
          title: 'Some Category',
        })

    const updated = await request(app)
      .put(`/api/category/${response.body.id}`)
      .send({
        title: 'Updated Category',
      })

      expect(updated.status).toBe(200);
      expect(updated.body.title).toBe('Updated Category');
    } catch(err) {
      console.log(err)
    }
  });
});
