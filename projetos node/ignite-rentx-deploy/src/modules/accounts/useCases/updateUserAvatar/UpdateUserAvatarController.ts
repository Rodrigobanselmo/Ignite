import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUserCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { id } = request.user;

    const updateUserAvatarUserCase = container.resolve(
      UpdateUserAvatarUserCase,
    );

    const user = await updateUserAvatarUserCase.execute({
      avatar_file: filename,
      user_id: id,
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserAvatarController };
