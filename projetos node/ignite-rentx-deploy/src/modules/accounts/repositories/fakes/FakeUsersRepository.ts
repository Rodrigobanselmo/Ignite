import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
      created_at: new Date(),
      avatar: null,
    });

    this.users.push(user);

    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === user_id);

    return user;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(userFind => userFind.id === user.id);

    this.users.splice(userIndex, 1, user);

    return user;
  }
}

export { FakeUsersRepository };
