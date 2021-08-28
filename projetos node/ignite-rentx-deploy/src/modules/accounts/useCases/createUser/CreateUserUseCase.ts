import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const existsUserWithSameEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (existsUserWithSameEmail) {
      throw new AppError('User already exists');
    }

    const passHash = await this.hashProvider.createHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: passHash,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };
