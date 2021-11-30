import { getCustomRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CreateCategorySchema } from '../validators/category.validator';

interface ICreateCategory {
  title: string;
}

class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = getCustomRepository(CategoryRepository);
  }

  async createCategory({ title }: ICreateCategory): Promise<Category> {
    const { value, error } = CreateCategorySchema.validate({ title });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const categoryAlreadyExists = await this.categoryRepository.findOne({ title });

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = this.categoryRepository.createCategory({
      title: value.title,
    });

    return category;
  }

  async listCategories(): Promise<[Category[], number]> {
    const categories = await this.categoryRepository.findAndCount();

    return categories;
  }

  async updateCategory(id: string, { title }: ICreateCategory): Promise<Category | undefined> {
    const { value, error } = CreateCategorySchema.validate({ title });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new Error('Category not found');
    }

    const updatedCategory = await this.categoryRepository.updateCategory(id, {
      title: value.title,
    });

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new Error('Category not found');
    }

    await this.categoryRepository.delete({ id });
  }
}

export { CategoryService };
