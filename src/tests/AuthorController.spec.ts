import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database/index';

jest.useFakeTimers('legacy');

let connection: Connection;

describe('Author Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    await request(app).post('/api/author')
      .send({
        name: 'Author 1',
        email: 'author1@email.com',
      });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new Author', async () => {
    const response = await request(app).post('/api/author')
      .send({
        name: 'John Doe',
        email: 'johndoe@email.com',
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new Author with existent email', async () => {
    const response = await request(app).post('/api/author')
      .send({
        name: 'Author 1',
        email: 'author1@email.com',
      });

    expect(response.status).toBe(400);
  });

  it('Should be able to find a Author by ID', async () => {
    const author = await request(app).post('/api/author')
      .send({
        name: 'Some Author',
        email: 'someauthor@email.com',
      });

    const response = await request(app).get(`/api/author/${author.body.id}`);

    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to list Authors', async () => {
    const response = await request(app).get('/api/author').query({
      limit: 1,
      offset: 0,
    });

    expect(response.status).toBe(200);
    expect(response.body[0].length).toBe(1);
    expect(response.body[1]).toBe(3);
    expect(response.body[0][0]).toHaveProperty('id');
    expect(response.body[0][0].name).toBe('Author 1');
  });

  it('Should be able to update an Author', async () => {
    const author = await request(app).post('/api/author').send({
      name: 'Author 2',
      email: 'author2@email.com',
    });

    const response = await request(app).put(`/api/author/${author.body.id}`).send({
      name: 'Author 2 Updated',
      email: 'author2updated@email.com',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Author 2 Updated');
  });

  it('Should not be able to update an Author with existent email', async () => {
    const author = await request(app).post('/api/author').send({
      name: 'Author 3',
      email: 'author3@email.com',
    });

    const response = await request(app).put(`/api/author/${author.body.id}`).send({
      name: 'Author 3 Updated',
      email: 'author1@email.com',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Email address already exists');
  });

  it('Should be able to delete an Author', async () => {
    const author = await request(app).post('/api/author').send({
      name: 'Author 4',
      email: 'author4@email.com',
    });

    const response = await request(app).delete(`/api/author/${author.body.id}`);

    expect(response.status).toBe(204);
  });
});
