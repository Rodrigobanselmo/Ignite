import { IUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      token =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    );

    return userToken;
  }

  async findByRefreshToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      userToken => userToken.refresh_token === token,
    );

    return userToken;
  }

  async delete(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(token => token.id === id);

    this.usersTokens.splice(userTokenIndex, 1);
  }
}

export { FakeUsersTokensRepository };
