import { ICreateCategoryDTO } from '@modules/cars/dtos/CategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.id === id);
    return category;
  }
}

export { FakeCategoriesRepository };
