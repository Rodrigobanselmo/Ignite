import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListAvailablesCarsUseCase } from './ListAvailablesCarsUseCase';

let listAvailablesCarsUseCase: ListAvailablesCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('ListAvailablesCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvailablesCarsUseCase = new ListAvailablesCarsUseCase(
      fakeCarsRepository,
    );
  });

  it('Should be able to list all availables cars', async () => {
    await fakeCarsRepository.create({
      name: 'Car 1',
      description: 'description',
      brand: 'Brand1',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'asb1234',
    });

    const car = await fakeCarsRepository.create({
      name: 'Car 2',
      description: 'description',
      brand: 'Brand2',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'acb1235',
    });

    car.available = false;
    await fakeCarsRepository.save(car);

    const cars = await listAvailablesCarsUseCase.execute();

    expect(cars).toHaveLength(1);
  });

  it('Should be able to list all availables cars with filter', async () => {
    await fakeCarsRepository.create({
      name: 'Car 1',
      description: 'description',
      brand: 'Brand1',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'asb1234',
    });

    await fakeCarsRepository.create({
      name: 'Car 2',
      description: 'description',
      brand: 'Brand1',
      category_id: 'category_id2',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'qwe123',
    });

    await fakeCarsRepository.create({
      name: 'Car 3',
      description: 'description',
      brand: 'Brand2',
      category_id: 'category_id2',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'acb1235',
    });

    const car = await fakeCarsRepository.create({
      name: 'Car 4',
      description: 'description',
      brand: 'Brand2',
      category_id: 'category_id3',
      daily_rate: 10,
      fine_amount: 20,
      license_plate: 'acb1235',
    });

    car.available = false;
    await fakeCarsRepository.save(car);

    const carsFiltered = await listAvailablesCarsUseCase.execute({
      brand: 'Brand1',
      category_id: 'category_id2',
    });

    expect(carsFiltered).toHaveLength(1);
  });
});
