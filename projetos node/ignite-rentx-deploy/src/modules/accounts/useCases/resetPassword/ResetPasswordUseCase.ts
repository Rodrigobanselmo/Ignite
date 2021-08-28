import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Invalid Token');
    }

    const isBeforeDate = this.dateProvider.compareIfBefore(
      new Date(),
      userToken.expires_date,
    );

    if (!isBeforeDate) {
      throw new AppError('Expired Token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const newPasswordHash = await this.hashProvider.createHash(password);
    user.password = newPasswordHash;

    await this.usersRepository.save(user);
    await this.usersTokensRepository.delete(userToken.id);
  }
}

export { ResetPasswordUseCase };
