import { CategoryServiceInMemory } from './in-memory/CategoryServiceInMemory';

describe('Category CRUD', () => {
  const categoryServiceInMemory = new CategoryServiceInMemory();

  it('Should be able to create a new category', async () => {
    const category = await categoryServiceInMemory.createCategory({
      title: 'Fiction',
    });

    expect(category).toHaveProperty('id');
  });

  it('Should be able to list all categories', async () => {
    const newCategory = await categoryServiceInMemory.createCategory({
      title: 'Romance',
    });

    const categories = await categoryServiceInMemory.listCategories();

    expect(categories).toHaveLength(2);
    expect(categories[1]).toBe(2);
    expect(categories[0]).toContainEqual(newCategory);
  });

  it('Should be able to find a category by id', async () => {
    const category = await categoryServiceInMemory.createCategory({
      title: 'Drama',
    });

    const foundCategory = await categoryServiceInMemory.findCategoryById(
      category.id,
    );

    if (foundCategory) {
      expect(foundCategory).toHaveProperty('id');
      expect(foundCategory).toHaveProperty('title');
      expect(foundCategory.title).toBe('Drama');
    }
  });

  it('Should be able to update a category', async () => {
    const category = await categoryServiceInMemory.createCategory({
      title: 'Categori',
    });

    const updatedCategory = await categoryServiceInMemory.UpdateCategory(category.id, {
      title: 'Category',
    });

    expect(updatedCategory).toHaveProperty('id');
    expect(updatedCategory).toHaveProperty('title');
    expect(updatedCategory.title).toBe('Category');
  });

  it('Should be able to delete an category', async () => {
    const category = await categoryServiceInMemory.createCategory({
      title: 'Terror',
    });

    await categoryServiceInMemory.deleteCategory(category.id);

    const foundCategory = await categoryServiceInMemory.findCategoryById(
      category.id,
    );

    expect(foundCategory).toBeUndefined();
  });
});
