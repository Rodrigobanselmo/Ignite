import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const hasCategory = await this.categoriesRepository.findByName(name);

    if (hasCategory) {
      throw new AppError('This category already exist');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoryUseCase };
