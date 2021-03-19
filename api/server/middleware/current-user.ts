import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  username: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    next();
  }
  try {
    const payload = jwt.verify(token!, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (e) {}
  next();
};
