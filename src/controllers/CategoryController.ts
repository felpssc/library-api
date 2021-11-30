import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

class CategoryController {
  async create(req: Request, res: Response) {
    const { title } = req.body;

    const service = new CategoryService();

    try {
      const category = await service.createCategory({ title });

      return res.status(201).json(category);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    const service = new CategoryService();

    try {
      const categories = await service.listCategories();

      return res.json(categories);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { title } = req.body;

    const service = new CategoryService();

    try {
      const category = await service.updateCategory(id, { title });

      return res.json(category);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const service = new CategoryService();

    try {
      await service.deleteCategory(id);

      return res.status(204).json();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CategoryController };
