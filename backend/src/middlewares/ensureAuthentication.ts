import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return response.status(401).json({ error: 'Invalid token' });
  }

  try {
    const decodedToken = verify(token, String(process.env.APP_SECRET));
    const { sub } = decodedToken as TokenPayload;
    request.user = { id: Number(sub) };
  } catch {
    return response.status(401).json({ error: 'Invalid token' });
  }

  return next();
}
