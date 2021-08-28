import { ICreateCategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
}

export { ICategoriesRepository };
