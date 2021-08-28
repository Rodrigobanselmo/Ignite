import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
