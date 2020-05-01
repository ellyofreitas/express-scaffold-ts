import { Router } from 'express';
import multer from 'multer';
import { ensureAuthentication } from '../middlewares';
import { CreateFileService } from '../services';
import { multerConfig } from '../config';

const fileRouter = Router();

const upload = multer(multerConfig);

fileRouter.use(ensureAuthentication);

fileRouter.post('/', upload.single('file'), async (req, res) => {
  const { originalname: name, filename: path } = req.file;

  const createFile = new CreateFileService();

  const file = await createFile.execute({ name, path });

  return res.status(201).json(file);
});

export default fileRouter;
