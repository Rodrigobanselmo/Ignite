import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specification_ids: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, specification_ids }: IRequest): Promise<Car> {
    // verifica se existe o carro
    const car = await this.carsRepository.findById(car_id);
    if (!car) {
      throw new AppError('Car not found');
    }

    // pega uma lista de especificações
    const specifications = await this.specificationsRepository.findByIds(
      specification_ids,
    );

    // salva
    car.specifications = specifications;

    const updatedCar = await this.carsRepository.save(car);

    return updatedCar;
  }
}

export { CreateCarSpecificationUseCase };
