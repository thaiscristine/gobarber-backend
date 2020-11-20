import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, '6bd27c1be124deaf10b2314240db9e8e', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
    // return session;
  }
}

export default AuthenticateUserService;
