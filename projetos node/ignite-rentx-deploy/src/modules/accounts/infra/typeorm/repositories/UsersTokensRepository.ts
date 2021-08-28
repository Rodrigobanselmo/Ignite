import { IUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: IUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      created_at: new Date(),
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userTokens;
  }

  async findByRefreshToken(token: string): Promise<UserToken | undefined> {
    const userTokens = await this.repository.findOne({
      refresh_token: token,
    });

    return userTokens;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
