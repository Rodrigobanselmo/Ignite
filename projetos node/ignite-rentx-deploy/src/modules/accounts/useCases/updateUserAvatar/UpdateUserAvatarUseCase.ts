import { uploadConfig } from '@config/upload';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { statSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUserCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Invalid user account');
    }

    if (user.avatar) {
      const filePath = resolve(uploadConfig.avatarFolder, user.avatar);
      try {
        statSync(filePath);
      } catch (err) {
        // return;
      }

      unlinkSync(filePath);
    }

    user.avatar = avatar_file;

    const updatedUser = this.usersRepository.save(user);

    return updatedUser;
  }
}

export { UpdateUserAvatarUserCase };
