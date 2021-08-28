import { randomBytes } from 'crypto';
import { diskStorage, Options } from 'multer';
import { resolve } from 'path';

import { AppError } from '@shared/errors/AppError';

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  avatarFolder: string;

  upload(folder: string, maxSize?: number, isImage?: boolean): Options;

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');
const avatarFolder = resolve(__dirname, '..', '..', 'tmp', 'avatars');

const uploadConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  avatarFolder,

  upload(folder: string, limit: number, isImage: boolean) {
    return {
      limits: {
        fileSize: limit || 3145728,
      },
      fileFilter: (req, file, cb) => {
        if (isImage) {
          const regex = new RegExp('image/w*');
          if (!regex.test(file.mimetype)) {
            cb(new AppError('Image format is not valid', 401));
          }
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', folder),
        filename: (req, file, cb) => {
          const hash = randomBytes(10).toString('hex');
          const name = `${hash}-${file.originalname}`;

          return cb(null, name);
        },
      }),
    };
  },
  config: {
    disk: {},
    aws: {
      bucket: 'rentx',
    },
  },
} as IUploadConfig;

export { uploadConfig };
