import { Request, Response } from 'express';
import { AuthorService, IListPagination } from '../services/AuthorService';

class AuthorController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const service = new AuthorService();

    try {
      const author = await service.createAuthor({ name, email });

      return res.status(201).json(author);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const service = new AuthorService();

    try {
      const author = await service.findAuthorById(id);

      return res.json(author);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    const service = new AuthorService();

    const { limit, offset }:IListPagination = req.query;

    try {
      const authors = await service.listAuthors({ limit, offset });

      return res.json(authors);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name, email } = req.body;

    const service = new AuthorService();

    try {
      const author = await service.updateAuthor(id, { name, email });

      return res.json(author);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const service = new AuthorService();

    try {
      await service.deleteAuthor(id);

      return res.status(204).json({ message: 'Author deleted' });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { AuthorController };
