import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequets {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({ user_id }: IRequets): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
