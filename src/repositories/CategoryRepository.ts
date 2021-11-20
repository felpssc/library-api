import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/Category';

interface ICreateCategory {
  title: string;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  async createCategory({ title }: ICreateCategory): Promise<Category> {
    const category = this.create({
      title,
    });

    return this.save(category);
  }

  async updateCategory(id: string, { title }: ICreateCategory): Promise<Category | undefined> {
    this.update(id, {
      title,
    });

    return this.findOne(id);
  }
}

export { CategoryRepository };
