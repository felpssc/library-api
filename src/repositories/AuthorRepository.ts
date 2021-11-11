import { EntityRepository, Repository } from 'typeorm';
import { Author } from '../entities/Author';

@EntityRepository(Author)
class AuthorRepository extends Repository<Author> {
  async createAuthor({ name, email }: Author): Promise<Author> {
    const author = this.create({ name, email });

    return this.save(author);
  }

  async findAuthorByEmail(email: string): Promise<Author | undefined> {
    return this.findOne({ email });
  }
}

export { AuthorRepository };
