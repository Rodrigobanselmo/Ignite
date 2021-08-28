import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@shared/container/providers/TokenProvider/models/ITokenProvider';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

interface ICredentials {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: ICredentials): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const roles: string[] = [];
    const token = this.tokenProvider.generateToken(user.id, roles);

    const refresh_token = this.tokenProvider.generateRefreshToken(
      user.id,
      user.email,
      roles,
    );

    const dateNow = this.dateProvider.dateNow();
    const expiresRefreshTokenDays = this.tokenProvider.expiresRefreshTokenDays();

    const refreshTokenExpiresDate = this.dateProvider.addDay(
      dateNow,
      expiresRefreshTokenDays,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refreshTokenExpiresDate,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
