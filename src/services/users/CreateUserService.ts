import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from '../../models';

import { AppError } from '../../errors';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    if (await usersRepository.findOne({ where: { email } })) {
      throw new AppError('Email address already used.');
    }

    const password_hash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password_hash,
    });

    await usersRepository.save(user);

    return user;
  }
}
