import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let fakeCarsRepository: FakeCarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('CreateCarSpecification', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeSpecificationsRepository,
      fakeCarsRepository,
    );
  });

  it('Should be able to add a new specification to car', async () => {
    const spec1 = await fakeSpecificationsRepository.create({
      name: 'Spec1',
      description: 'description1',
    });
    const spec2 = await fakeSpecificationsRepository.create({
      name: 'Spec2',
      description: 'description2',
    });

    const car = await fakeCarsRepository.create({
      name: 'Name',
      description: 'description',
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 60,
      license_plate: 'ABC1234',
    });

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id as string,
      specification_ids: [spec1.id, spec2.id],
    });

    expect(updatedCar.specifications).toHaveLength(2);
  });

  it('Should not be able to add a new specification to invalid car', async () => {
    const spec1 = await fakeSpecificationsRepository.create({
      name: 'Spec1',
      description: 'description1',
    });
    const spec2 = await fakeSpecificationsRepository.create({
      name: 'Spec2',
      description: 'description2',
    });

    await expect(
      createCarSpecificationUseCase.execute({
        car_id: 'invalid-car',
        specification_ids: [spec1.id, spec2.id],
      }),
    ).rejects.toEqual(new AppError('Car not found'));
  });
});
