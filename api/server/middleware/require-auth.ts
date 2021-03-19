import { Response, Request, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError('Not authorized');
  }
  next();
};
