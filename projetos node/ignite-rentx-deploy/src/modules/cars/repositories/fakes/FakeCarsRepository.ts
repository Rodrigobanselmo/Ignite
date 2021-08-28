import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository, IFiltersRequest } from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];
  async create({
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      created_at: new Date(),
      available: true,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.license_plate === license_plate);

    return car;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.id === id);

    return car;
  }

  async listAllCars(): Promise<Car[]> {
    return this.cars;
  }

  async findAvailables({
    brand,
    category_id,
    name,
  }: IFiltersRequest): Promise<Car[]> {
    let all = this.cars.filter(car => car.available === true);

    if (brand) {
      all = all.filter(car => car.brand === brand);
    }

    if (category_id) {
      all = all.filter(car => car.category_id === category_id);
    }

    if (name) {
      all = all.filter(car => car.name === name);
    }

    return all;
  }

  async save(car: Car): Promise<Car> {
    const indexCar = this.cars.findIndex(carFind => carFind.id === car.id);

    this.cars.splice(indexCar, 1, car);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const indexCar = this.cars.findIndex(carFind => carFind.id === id);
    const car: Car = {
      ...this.cars[indexCar],
      available,
    };
    this.cars.splice(indexCar, 1, car);
  }
}

export { FakeCarsRepository };
