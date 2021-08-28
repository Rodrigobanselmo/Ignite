import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  ICarsRepository,
  IFiltersRequest,
} from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAvailablesCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data?: IFiltersRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailables({
      brand: data?.brand,
      category_id: data?.category_id,
      name: data?.name,
    });

    return cars;
  }
}

export { ListAvailablesCarsUseCase };
