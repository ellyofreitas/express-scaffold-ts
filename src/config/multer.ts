import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileExtension = extname(file.originalname);
      const fileName = fileHash + fileExtension;

      return cb(null, fileName);
    },
  }),
};
