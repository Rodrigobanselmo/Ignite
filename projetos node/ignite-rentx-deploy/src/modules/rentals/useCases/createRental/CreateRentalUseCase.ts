import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

dayjs.extend(utc);

interface IRequest {
  car_id: string;
  user_id: string;
  return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ car_id, user_id, return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    // não deve ser possível resevar um carro inexiste
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('This car not exists');
    }

    // não deve ser possível cadastrar um novo aluguel
    // caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (carUnavailable) {
      throw new AppError('This car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );
    if (rentalOpenToUser) {
      throw new AppError('There is a rental pending in your account');
    }

    // a data de retorno não pode ser anterior a data de reserva
    const dateNow = this.dateProvider.dateNow();

    const diffHours = this.dateProvider.compareInHours(dateNow, return_date);

    if (diffHours < minimumHour) {
      throw new AppError('Invalid return date');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      return_date,
      total: (diffHours / 24) * car.daily_rate,
      user_id,
    });
    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
