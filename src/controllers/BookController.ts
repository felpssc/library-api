import { Request, Response } from 'express';
import { BookService } from '../services/BookService';

class BookController {
  async create(req: Request, res: Response) {
    const {
      title,
      published_year,
      author_id,
      category_id,
    } = req.body;
    const service = new BookService();

    try {
      const book = await service.createBook({
        title,
        published_year,
        author_id,
        category_id,
      });

      return res.status(201).json(book);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const service = new BookService();

    try {
      const book = await service.findBookById(id);

      return res.json(book);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listAuthorBooks(req: Request, res: Response) {
    const { author_id } = req.params;
    const service = new BookService();

    try {
      const books = await service.findBooksByAuthorId(author_id);

      return res.json(books);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { BookController };
