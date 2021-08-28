import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import {
  ICarsRepository,
  IFiltersRequest,
} from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async listAllCars(): Promise<Car[]> {
    const cars = await this.repository.find({
      relations: ['specifications'],
    });
    return cars;
  }

  async findAvailables({
    brand,
    category_id,
    name,
  }: IFiltersRequest): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand });
    }
    if (name) {
      carsQuery.andWhere('cars.name = :name', { name });
    }
    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async save(car: Car): Promise<Car> {
    const updatedCar = await this.repository.save(car);

    return updatedCar;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.update(id, { available });
  }
}

export { CarsRepository };
