import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database/index';
import { Author } from '../entities/Author';
import { Category } from '../entities/Category';

jest.useFakeTimers('legacy');
jest.setTimeout(30000);

let connection: Connection;

let author: { body: Author };
let category: { body: Category };

describe('Book Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    author = await request(app)
      .post('/api/author')
      .send({
        name: 'Some Author',
        email: 'greatauthor@email.com',
      });

    category = await request(app)
      .post('/api/category')
      .send({
        title: 'New Category',
      });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new book', async () => {
    try {
      const book = await request(app)
        .post('/api/book')
        .send({
          title: 'New Book',
          published_year: 2020,
          author_id: author.body.id,
          category_id: category.body.id, 
        });

      expect(book.status).toBe(201);
      expect(book.body).toHaveProperty('id');
      expect(book.body.title).toBe('New Book');
    } catch (error) {
      console.log(error);
    }
  });

  it('should be able to find an book by id', async () => {
    const book = await request(app)
      .post('/api/book')
      .send({
        title: 'A nice book',
        published_year: 2020,
        author_id: author.body.id,
        category_id: category.body.id, 
      });

    const response = await request(app)
      .get(`/api/book/${book.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('A nice book');
  })

  it('should be able to find author books', async () => {
    const books = await request(app)
      .get(`/api/book/author/${author.body.id}`);
    
    expect(books.status).toBe(200);
    expect(books.body).toHaveLength(2);
    expect(books.body[0].title).toBe('New Book');
  })
});