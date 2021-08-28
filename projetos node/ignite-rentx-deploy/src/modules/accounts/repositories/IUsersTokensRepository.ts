import { IUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create(date: IUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined>;
  findByRefreshToken(token: string): Promise<UserToken | undefined>;
  delete(id: string): Promise<void>;
}

export { IUsersTokensRepository };
