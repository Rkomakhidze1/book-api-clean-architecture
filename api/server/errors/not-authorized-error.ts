import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export { NotAuthorizedError };
