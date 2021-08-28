import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('ListAllCars', () => {
  beforeAll(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listCarsUseCase = new ListCarsUseCase(fakeCarsRepository);
  });

  it('Should be able to list all cars', async () => {
    await fakeCarsRepository.create({
      name: 'Car 1',
      description: 'description',
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'asb1234',
    });

    const car = await fakeCarsRepository.create({
      name: 'Car 2',
      description: 'description',
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'acb1235',
    });
    car.available = false;
    await fakeCarsRepository.save(car);

    const cars = await listCarsUseCase.execute();
    expect(cars).toHaveLength(2);
  });
});
