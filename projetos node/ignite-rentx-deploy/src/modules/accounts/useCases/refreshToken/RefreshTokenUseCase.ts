import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { ITokenProvider } from '@shared/container/providers/TokenProvider/models/ITokenProvider';
import { AppError } from '@shared/errors/AppError';

interface ITokenResponse {
  token: string;
  refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const { sub: user_id, email } = this.tokenProvider.verifyIsValidToken({
      token: refresh_token,
      secret_type: 'refresh',
    });

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      refresh_token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    const roles: string[] = [];
    const newToken = this.tokenProvider.generateToken(userToken.id, roles);

    const newRefreshToken = this.tokenProvider.generateRefreshToken(
      user_id,
      email,
      [],
    );

    const dateNow = this.dateProvider.dateNow();
    const refresh_expires_days = this.tokenProvider.expiresRefreshTokenDays();
    const expires_date = this.dateProvider.addDay(
      dateNow,
      refresh_expires_days,
    );

    await this.usersTokensRepository.create({
      refresh_token,
      user_id,
      expires_date,
    });
    await this.usersTokensRepository.delete(userToken.id);

    return {
      refresh_token: newRefreshToken,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
