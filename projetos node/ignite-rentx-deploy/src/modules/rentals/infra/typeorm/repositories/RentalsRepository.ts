import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, IsNull, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({
    car_id,
    return_date,
    total,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      return_date,
      total,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      car_id,
      end_date: IsNull(),
    });

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      user_id,
      end_date: IsNull(),
    });

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUserId(id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id: id,
      },
      relations: ['car'],
    });

    return rentals;
  }

  async save(rental: Rental): Promise<Rental> {
    const updatedRental = await this.repository.save(rental);
    return updatedRental;
  }
}

export { RentalsRepository };
