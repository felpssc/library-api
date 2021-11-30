import { getCustomRepository } from 'typeorm';
import { BookRepository } from '../repositories/BookRepository';
import { CreateBookSchema } from '../validators/book.validator';
import { AuthorService } from './AuthorService';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { Book } from '../entities/Book';

interface ICreateBook {
  title: string;
  published_year: number;
  author_id: string;
  category_id: string;
}

class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = getCustomRepository(BookRepository);
  }

  async createBook({
    title, published_year, author_id, category_id,
  }: ICreateBook): Promise<Book> {
    const authorService: AuthorService = new AuthorService();
    const categoryService: CategoryRepository = getCustomRepository(CategoryRepository);

    const { value, error } = CreateBookSchema.validate({
      title, published_year, author_id, category_id,
    });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const author = await authorService.findAuthorById(value.author_id);

    if (!author) {
      throw new Error('Author not found');
    }

    const category = await categoryService.findOne({ id: value.category_id });

    if (!category) {
      throw new Error('Category not found');
    }

    const book = this.bookRepository.create({
      title: value.title,
      published_year: value.published_year,
      author_id: value.author_id,
      category_id: value.category_id,
    });

    await this.bookRepository.save(book);

    return book;
  }

  async findBookById(id: string): Promise<Book | undefined> {
    const book = await this.bookRepository.findOne({ id }, {
      relations: ['author', 'category'],
    });

    return book;
  }

  async findBooksByAuthorId(author_id: string): Promise<Book[]> {
    const books = await this.bookRepository.find({ where: { author_id }, relations: ['author', 'category'] });

    return books;
  }
}

export { BookService };
