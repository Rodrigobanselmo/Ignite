import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';
import { hash } from 'bcryptjs';

import { DayJSProvider } from '@shared/container/providers/DateProvider/implementations/DayJSProvider';
import { BCryptProvider } from '@shared/container/providers/HashProvider/implementations/BCryptProvider';
import { JwtTokenProvider } from '@shared/container/providers/TokenProvider/implementations/JwtTokenProvider';
import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let dateProvider: DayJSProvider;
let tokenProvider: JwtTokenProvider;
let hashProvider: BCryptProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    dateProvider = new DayJSProvider();
    tokenProvider = new JwtTokenProvider();
    hashProvider = new BCryptProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      dateProvider,
      tokenProvider,
      hashProvider,
    );
  });

  it('Should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password: await hash('asdqwe123', 8),
      driver_license: 'License',
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: 'asdqwe123',
    });

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate a invalid user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'user.email',
        password: 'asdqwe123',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('Should not be able to authenticate with a invalid password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Name',
      email: 'email@email.com',
      password: await hash('asdqwe123', 8),
      driver_license: 'License',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '123qweasd',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
