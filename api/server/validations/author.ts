import { body } from 'express-validator';

export const authorValidation = [
  body('name').notEmpty().withMessage('missing name'),
  body('name').isString().withMessage('name must be a string'),
];
