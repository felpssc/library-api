import { Book } from '../../entities/Book';
import { CreateBookSchema } from '../../validators/book.validator';

import { AuthorServiceInMemory } from './AuthorServiceInMemory';

import { CategoryServiceInMemory } from './CategoryServiceInMemory';

interface ICreateBook {
  title: string;
  published_year: number;
  author_id: string;
  category_id: string;
}

const authorServiceInMemory = new AuthorServiceInMemory();
const categoryServiceInMemory = new CategoryServiceInMemory();

class BookServiceInMemory {
  books: Book[] = [];

  async createBook({
    title, published_year, author_id, category_id,
  }: ICreateBook): Promise<Book> {
    const { value, error } = CreateBookSchema.validate({
      title, published_year, author_id, category_id,
    });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const author = await authorServiceInMemory.findAuthorById(value.author_id);

    if (!author) {
      throw new Error('Author not found');
    }

    const category = await categoryServiceInMemory.findCategoryById(value.category_id);

    if (!category) {
      throw new Error('Category not found');
    }

    const book = new Book();

    Object.assign(book, {
      title: value.title,
      published_year: value.published_year,
      author_id: value.author_id,
      category_id: value.category_id,
    });

    this.books.push(book);

    return book;
  }

  async findBookById(id: string): Promise<Book | undefined> {
    const book = this.books.find((e) => e.id === id);

    return book;
  }

  async findBooksByAuthorId(author_id: string): Promise<Book[]> {
    const books = this.books.filter((e) => e.author_id === author_id);

    return books;
  }
}

export { BookServiceInMemory, authorServiceInMemory, categoryServiceInMemory };
