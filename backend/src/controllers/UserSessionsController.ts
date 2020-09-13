import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class UserSessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body;

      const authenticateUserService = new AuthenticateUserService();

      const { user, token } = await authenticateUserService.execute({
        username,
        password,
      });

      delete user.password;

      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UserSessionsController;
