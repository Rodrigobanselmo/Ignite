import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  findById(user_id: string): Promise<User | undefined> {
    const user = this.repository.findOne(user_id);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

export { UsersRepository };
