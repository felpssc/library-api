import { getCustomRepository } from 'typeorm';
import { Author } from '../entities/Author';
import { AuthorRepository } from '../repositories/AuthorRepository';
import { CreateAuthorSchema, UpdateAuthorSchema } from '../validators/author.validator';
import { redis } from '../../redis-config';

interface ICreateAuthor {
  name: string;
  email: string;
}

interface IUpdateAuthor {
  name?: string;
  email?: string;
}

interface IListPagination {
  offset?: number;
  limit?: number;
}

class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = getCustomRepository(AuthorRepository);
  }

  async createAuthor({ name, email }: ICreateAuthor):Promise<Author> {
    const { value, error } = CreateAuthorSchema.validate({ name, email });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const authorAlreadyExists = await this.authorRepository.findAuthorByEmail(email);

    if (authorAlreadyExists) {
      throw new Error('Author already exists');
    }

    const author = await this.authorRepository.createAuthor({
      name: value.name,
      email: value.email,
    });

    const { id } = author;

    await redis.set(`author-${id}`, JSON.stringify(author), 'EX', 300);

    return author;
  }

  async findByEmail(email: string):Promise<Author | undefined> {
    const cachedAuthor = await redis.get(`author-${email}`);

    if (cachedAuthor) {
      return JSON.parse(cachedAuthor);
    }

    const author = await this.authorRepository.findAuthorByEmail(email);

    await redis.set(`author-${email}`, JSON.stringify(author), 'EX', 600);

    return author;
  }

  async findAuthorById(id: string):Promise<Author | undefined> {
    const authorRedis:string | null = await redis.get(`author-${id}`);

    if (authorRedis) {
      return JSON.parse(authorRedis);
    }

    const author = this.authorRepository.findOne(id, {
      relations: ['books'],
    });

    return author;
  }

  async listAuthors({ limit = 10, offset = 0 }: IListPagination):Promise<[Author[], number]> {
    const cachedAuthors = await redis.get(`list-authors-limit-${limit}-offset-${offset}`);

    if (cachedAuthors) {
      return JSON.parse(cachedAuthors);
    }

    const authors = await this.authorRepository.findAndCount({
      skip: offset,
      take: limit,
    });

    await redis.set(`list-authors-limit-${limit}-offset-${offset}`, JSON.stringify(authors), 'EX', 200);

    return authors;
  }

  async updateAuthor(id: string, { name, email }: IUpdateAuthor):Promise<Author> {
    const { value, error } = UpdateAuthorSchema.validate({ name, email });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const author = await this.findAuthorById(id);

    if (!author) {
      throw new Error('Author not found');
    }

    if (email) {
      const emailAlreadyExists = await this.findByEmail(email);

      if (emailAlreadyExists && emailAlreadyExists.id !== author.id) {
        throw new Error('Email address already exists');
      }
    }

    author.name = value.name;
    author.email = value.email;

    await this.authorRepository.save(author);

    return author;
  }

  async deleteAuthor(id: string):Promise<void> {
    const author = await this.findAuthorById(id);

    if (!author) {
      throw new Error('Author not found');
    }

    await this.authorRepository.delete(id);
  }
}

export { AuthorService, IListPagination };
