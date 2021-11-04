import { Author } from '../../entities/Author';
import { CreateAuthorSchema, UpdateAuthorSchema } from '../../validators/author.validator';

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

class AuthorServiceInMemory {
  authors: Author[] = [];

  async createAuthor({ name, email }: ICreateAuthor):Promise<Author> {
    const { value, error } = CreateAuthorSchema.validate({ name, email });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const authorAlreadyExists = await this.findByEmail(email);

    if (authorAlreadyExists) {
      throw new Error('Author already exists');
    }

    const author = new Author();

    Object.assign(author, {
      name: value.name,
      email: value.email,
    });

    this.authors.push(author);

    return author;
  }

  async findByEmail(email: string):Promise<Author | undefined> {
    const author = await this.authors.find((e) => e.email === email);

    return author;
  }

  async findAuthorById(id: string):Promise<Author | undefined> {
    const author = this.authors.find((e) => e.id === id);

    return author;
  }

  async listAuthors({ limit = 10, offset = 0 }: IListPagination):Promise<[Author[], number]> {
    const authors = this.authors.slice(offset, offset + limit);
    return [authors, this.authors.length];
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

    return author;
  }

  async deleteAuthor(id: string):Promise<void> {
    const author = await this.findAuthorById(id);

    if (!author) {
      throw new Error('Author not found');
    }

    await delete this.authors[this.authors.indexOf(author)];
  }
}

export { AuthorServiceInMemory };
