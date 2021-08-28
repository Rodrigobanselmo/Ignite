import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface IFiltersRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}
interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  listAllCars(): Promise<Car[]>;
  findAvailables(data?: IFiltersRequest): Promise<Car[]>;
  save(car: Car): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
