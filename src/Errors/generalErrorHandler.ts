import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ErrorWithStatusCode } from './errorGenerator';

const generalErrorHandler: ErrorRequestHandler = (
  error: ErrorWithStatusCode,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { message, statusCode } = error;
  console.log(error);
  response.status(statusCode || 500).json({ message });
};

export default generalErrorHandler;
