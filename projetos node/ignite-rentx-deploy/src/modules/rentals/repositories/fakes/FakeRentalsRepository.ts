import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    return_date,
    user_id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      return_date,
      start_date: new Date(),
      user_id,
      total,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUserId(id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === id);
  }

  async save(rental: Rental): Promise<Rental> {
    const rentalIndex = this.rentals.findIndex(
      rentalFind => rentalFind.id === rental.id,
    );
    this.rentals.splice(rentalIndex, 1, rental);

    return this.rentals[rentalIndex];
  }
}

export { FakeRentalsRepository };
