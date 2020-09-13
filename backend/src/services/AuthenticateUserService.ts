import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import db from '../database/connection';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password?: string;
}

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ username, password }: Request): Promise<Response> {
    const [user] = await db<Required<User>>('users').where({
      username,
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, String(process.env.APP_SECRET), {
      subject: String(user.id),
      expiresIn: '3d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
