import { Response } from 'express';

export class ResponseMapper {
  private statusCode: number | null;
  private type: string | null;
  private data: object | null;
  private message: string | null;
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode: number, message: string, data: object) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
    return this;
  }

  setError(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  send(res: Response) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.statusCode as number).json(result);
    }
    return res.status(this.statusCode as number).json({
      status: this.type,
      message: this.message,
    });
  }
}
