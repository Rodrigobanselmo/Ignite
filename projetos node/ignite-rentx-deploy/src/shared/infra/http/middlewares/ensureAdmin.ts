import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  // const { id } = request.user;

  try {
    // const usersRepository = new UsersRepository();
    // const user = await usersRepository.findById(id);

    // if (!user || user.admin !== true) {
    // throw new AppError('Access Denied', 401);
    // }

    return next();
  } catch (err) {
    return next(err);
  }
}

export { ensureAdmin };
