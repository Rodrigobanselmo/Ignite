import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

interface IUploadReturn {
  storage: multer.StorageEngine;
}

export default {
  upload(folder: string): IUploadReturn {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
