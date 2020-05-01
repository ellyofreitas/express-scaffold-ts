import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { authConfig } from '../../config';

import { AppError } from '../../errors';

import { User } from '../../models';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRespository = getRepository(User);

    const user = await usersRespository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect Email/Password validation', 401);
    }

    if (!(await compare(password, user.password_hash))) {
      throw new AppError('Incorrect Email/Password validation', 401);
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
