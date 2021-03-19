import { body } from 'express-validator';

export const bookValidation = [
  body('title').notEmpty().withMessage('missing title'),
  body('title').isString().withMessage('title must be a string'),
];
