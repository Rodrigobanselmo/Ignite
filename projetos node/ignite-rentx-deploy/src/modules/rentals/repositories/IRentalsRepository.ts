import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(date: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
  findById(id: string): Promise<Rental | undefined>;
  findByUserId(user_id: string): Promise<Rental[]>;
  save(rental: Rental): Promise<Rental>;
}

export { IRentalsRepository };
