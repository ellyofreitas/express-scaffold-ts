import { getRepository } from 'typeorm';
import { File } from '../../models';

interface Request {
  name: string;
  path: string;
}

export default class CreateFileService {
  public async execute({ name, path }: Request): Promise<File> {
    const filesRepository = getRepository(File);

    const file = filesRepository.create({ name, path });

    await filesRepository.save(file);

    return file;
  }
}
