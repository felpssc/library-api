import { v4 as uuid } from 'uuid';
import { BookServiceInMemory, authorServiceInMemory, categoryServiceInMemory } from './in-memory/BookServiceInMemory';

import { Book } from '../entities/Book';
import { Author } from '../entities/Author';
import { Category } from '../entities/Category';

let bookServiceInMemory: BookServiceInMemory;

let category: Category;

describe('Book CRUD', () => {
  beforeAll(async () => {
    category = await categoryServiceInMemory.createCategory({
      title: 'Fiction',
    });
  });

  beforeEach(async () => {
    bookServiceInMemory = new BookServiceInMemory();
  });

  it('Should be able to create a new book', async () => {
    const author: Author = await authorServiceInMemory.createAuthor({
      name: 'Book Author',
      email: 'bookauthor@email.com',
    });

    let book: Book;

    if (author.id) {
      book = await bookServiceInMemory.createBook({
        title: 'The Lord of the Rings',
        published_year: 1954,
        author_id: author.id,
        category_id: category.id,
      });

      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('published_year');
      expect(book).toHaveProperty('author_id');
      expect(book.title).toBe('The Lord of the Rings');
    }
  });

  it('Should not be able to create a new book with inexistent author or category', async () => {
    const author_id = uuid();
    const category_id = uuid();

    try {
      await bookServiceInMemory.createBook({
        title: 'The Lord of the Rings',
        published_year: 1954,
        author_id,
        category_id,
      });
    } catch (error: any) {
      expect(error).toEqual(new Error('Author not found'));
    }
  });

  it('Should be able to find a book by ID', async () => {
    const author: Author = await authorServiceInMemory.createAuthor({
      name: 'Author Example',
      email: 'authorexample@email.com',
    });

    let book: Book;

    if (author.id) {
      book = await bookServiceInMemory.createBook({
        title: 'The Lord of the Rings',
        published_year: 1954,
        author_id: author.id,
        category_id: category.id,
      });

      const foundBook = await bookServiceInMemory.findBookById(book.id);

      expect(foundBook).toBe(book);
    }
  });

  it('Should be able to find books by author ID', async () => {
    const author: Author = await authorServiceInMemory.createAuthor({
      name: 'Author With Many Books',
      email: 'authorwithmanybooks@email.com',
    });

    const { id: author_id } = author;

    if (author_id) {
      const books = await Promise.all(
        [1, 2, 3].map(async (i) => {
          const book = await bookServiceInMemory.createBook({
            title: `Book ${i}`,
            published_year: 1954,
            author_id,
            category_id: category.id,
          });

          return book;
        }),
      );

      const foundBooks = await bookServiceInMemory.findBooksByAuthorId(author_id);

      expect(foundBooks).toEqual(books);
    }
  });
});
