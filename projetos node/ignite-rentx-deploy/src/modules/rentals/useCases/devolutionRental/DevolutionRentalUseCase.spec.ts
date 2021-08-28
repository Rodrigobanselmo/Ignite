import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import { DayJSProvider } from '@shared/container/providers/DateProvider/implementations/DayJSProvider';
import { AppError } from '@shared/errors/AppError';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let dateProvider: DayJSProvider;
let devolutionRentalUseCase: DevolutionRentalUseCase;

describe('DevolutionRental', () => {
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    dateProvider = new DayJSProvider();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      fakeRentalsRepository,
      fakeCarsRepository,
      dateProvider,
    );
  });

  it('Should be able to make a rent return', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 20,
      description: 'Description',
      fine_amount: 40,
      license_plate: 'Licence',
      name: 'Car',
    });

    const rental = await fakeRentalsRepository.create({
      car_id: car.id,
      return_date: dateProvider.addDay(dateProvider.dateNow(), 1),
      total: 60,
      user_id: 'user_id',
    });

    const updatedRental = await devolutionRentalUseCase.execute({
      id: rental.id,
    });

    expect(updatedRental).toHaveProperty('id');
  });

  it('Should not be able to make a rent return with invalid rental', async () => {
    expect(async () => {
      await devolutionRentalUseCase.execute({
        id: 'invalid-id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
