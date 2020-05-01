import { getRepository } from 'typeorm';
import { User } from '../../models';
import { AppError } from '../../errors';

export default class FindByIdUserService {
  public async execute(id: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
