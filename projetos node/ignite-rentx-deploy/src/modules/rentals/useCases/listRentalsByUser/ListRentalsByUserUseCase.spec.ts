import { DayJSProvider } from '@shared/container/providers/DateProvider/implementations/DayJSProvider';
import { FakeRentalsRepository } from '../../repositories/fakes/FakeRentalsRepository';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

let listRentalsByUserUseCase: ListRentalsByUserUseCase;
let fakeRentalsRepository: FakeRentalsRepository;
let dateProvider: DayJSProvider;

describe('CreateRentals', () => {
  beforeEach(() => {
    dateProvider = new DayJSProvider();
    fakeRentalsRepository = new FakeRentalsRepository();

    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      fakeRentalsRepository,
    );
  });

  it('Should be able to list all rentals by User', async () => {
    await fakeRentalsRepository.create({
      car_id: 'car-id-2',
      return_date: dateProvider.addDay(new Date(), 1),
      total: 40,
      user_id: 'user-id',
    });

    await fakeRentalsRepository.create({
      car_id: 'car-id-1',
      return_date: dateProvider.addDay(new Date(), 2),
      total: 60,
      user_id: 'user-id',
    });

    await fakeRentalsRepository.create({
      car_id: 'car-id-3',
      return_date: dateProvider.addDay(new Date(), 2),
      total: 60,
      user_id: 'user-id-2',
    });

    const rentals = await listRentalsByUserUseCase.execute({
      user_id: 'user-id',
    });

    expect(rentals).toHaveLength(2);
  });
});
