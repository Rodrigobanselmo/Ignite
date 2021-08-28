import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;
    let total = 0;
    // Verifica se existe esse aluguel
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    // Verifica o tempo de aluguel
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(dateNow, rental.return_date);
    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) {
      throw new AppError('Car does not exists');
    }

    if (daily > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    const updatedCar = await this.rentalsRepository.save(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return updatedCar;
  }
}

export { DevolutionRentalUseCase };
