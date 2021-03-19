import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('validation error was thrown');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((e) => {
      return {
        message: e.msg,
        field: e.param,
      };
    });
  }
}

export { RequestValidationError };
