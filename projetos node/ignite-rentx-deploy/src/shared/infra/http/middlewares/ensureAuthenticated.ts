import { NextFunction, Request, Response } from 'express';

import { JwtTokenProvider } from '@shared/container/providers/TokenProvider/implementations/JwtTokenProvider';
import { AppError } from '@shared/errors/AppError';

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  // const authHeader = request.headers.authorization;
  // const jwtTokenProvider = new JwtTokenProvider();
  // if (!authHeader) {
  // throw new AppError('JWT token is missing', 401);
  // }

  // const [, token] = authHeader.split(' ');

  try {
    // const { sub: user_id } = jwtTokenProvider.verifyIsValidToken({
    // token,
    // secret_type: 'default',
    // });

    /*     const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    } */

    request.user = {
      id: '2345678',
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { ensureAuthenticated };
