import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export { IUsersRepository };
