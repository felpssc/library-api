import { getCustomRepository } from 'typeorm';
import { Author } from '../entities/Author';
import { AuthorRepository } from '../repositories/AuthorRepository';
import { CreateAuthorSchema, UpdateAuthorSchema } from '../validators/author.validator';
import { setRedis, getRedis } from '../utils/redis.utils';

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

    await setRedis(`author-${id}`, JSON.stringify(author));

    return author;
  }

  async findByEmail(email: string):Promise<Author | undefined> {
    const author = await this.authorRepository.findAuthorByEmail(email);

    return author;
  }

  async findAuthorById(id: string):Promise<Author | undefined> {
    const authorRedis:any = await getRedis(`author-${id}`);

    if (authorRedis) {
      return JSON.parse(authorRedis);
    }

    const author = this.authorRepository.findOne(id);

    return author;
  }

  async listAuthors({ limit = 10, offset = 0 }: IListPagination):Promise<[Author[], number]> {
    const authors = await this.authorRepository.findAndCount({
      skip: offset,
      take: limit,
    });

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
