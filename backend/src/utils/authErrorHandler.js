export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400;
    this.isOperational = true;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
