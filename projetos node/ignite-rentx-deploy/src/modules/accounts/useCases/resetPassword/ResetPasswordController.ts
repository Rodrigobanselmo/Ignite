import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { token } = request.params;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute(token, password);

    return response.status(200).send();
  }
}

export { ResetPasswordController };
