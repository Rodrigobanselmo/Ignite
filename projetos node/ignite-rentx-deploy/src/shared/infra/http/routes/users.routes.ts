import { uploadConfig } from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const upload = multer(uploadConfig.upload('avatars', undefined, true));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoutes };
