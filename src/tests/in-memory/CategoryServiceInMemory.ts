import { Category } from '../../entities/Category';

import { CreateCategorySchema } from '../../validators/category.validator';

interface ICreateCategory {
  title: string;
}

class CategoryServiceInMemory {
  categories: Category[] = [];

  async createCategory({ title }: ICreateCategory): Promise<Category> {
    const { value, error } = CreateCategorySchema.validate({ title });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const categoryAlreadyExists = this.categories.find((category) => category.title === title);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = new Category();

    Object.assign(category, {
      title: value.title,
    });

    this.categories.push(category);

    return category;
  }

  async listCategories(): Promise<[Category[], number]> {
    return [this.categories, this.categories.length];
  }

  async findCategoryById(id: string): Promise<Category | undefined> {
    const category = this.categories.find((e) => e.id === id);

    return category;
  }

  async UpdateCategory(id: string, { title }: ICreateCategory): Promise<Category> {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw new Error('Category not found');
    }

    category.title = title;

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw new Error('Category not found');
    }

    this.categories = this.categories.filter((e) => e.id !== id);
  }
}

export { CategoryServiceInMemory };
