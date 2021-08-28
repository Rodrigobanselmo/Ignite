/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

function errorsMessages(
  err: Error,
  req: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  // next(err);
  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
}

export { errorsMessages };
