import { StatusCodes } from 'http-status-codes';

export class AppError implements Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = StatusCodes.BAD_REQUEST) {
    // super();
    this.message = message;
    this.statusCode = statusCode;
  }
  name: string;
  stack?: string | undefined;
}
