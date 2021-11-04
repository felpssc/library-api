import { AuthorServiceInMemory } from './in-memory/AuthorServiceInMemory';

let authorServiceInMemory: AuthorServiceInMemory;

describe('Author CRUD', () => {
  beforeEach(async () => {
    authorServiceInMemory = new AuthorServiceInMemory();

    const authorExample = authorServiceInMemory.createAuthor({
      name: 'Author 1',
      email: 'author1@email.com',
    });

    await authorExample;
  });

  it('Should be able to create a new author', async () => {
    const author = await authorServiceInMemory.createAuthor({
      name: 'John Doe',
      email: 'someemail@email.com',
    });

    expect(author).toHaveProperty('id');
  });

  it('Should not be able to create a new author with existent email', async () => {
    try {
      await authorServiceInMemory.createAuthor({
        name: 'John Doe',
        email: 'author1@email.com',
      });
    } catch (error: any) {
      expect(error.message).toBe('Author already exists');
    }
  });

  it('Should be able to search a author by email', async () => {
    const author = await authorServiceInMemory.findByEmail('author1@email.com');

    expect(author).toHaveProperty('id');
  });

  it('Should be able to search a author by id', async () => {
    const author = await authorServiceInMemory.createAuthor({
      name: 'John Doe',
      email: 'johndoe@email.com',
    });

    if (author?.id) {
      const searchedAuthor = await authorServiceInMemory.findAuthorById(author.id);

      expect(searchedAuthor).toBe(author);
    }
  });

  it('Should be able to list authors', async () => {
    const authors = await authorServiceInMemory.listAuthors({ limit: 10, offset: 0 });

    expect(authors).toHaveLength(2);
  });

  it('Should be able to update a author', async () => {
    const author = await authorServiceInMemory.findByEmail('author1@email.com');

    if (author?.id) {
      const updatedAuthor = await authorServiceInMemory.updateAuthor(author.id, {
        name: 'updated name',
        email: 'updatedemail@email.com',
      });

      expect(updatedAuthor).toEqual({
        id: author.id,
        name: 'updated name',
        email: 'updatedemail@email.com',
      });
    }
  });

  it('Should be able to delete a existent author', async () => {
    const author = await authorServiceInMemory.findByEmail('author1@email.com');

    if (author?.id) {
      expect(await authorServiceInMemory.deleteAuthor(author.id)).toBeUndefined();
    }
  });
});
