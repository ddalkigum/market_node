import { NextFunction, Request, Response } from 'express';
import User from '../Entities/user/User';
import errorWrapper from '../Errors/errorWrapper';
import jwt from 'jsonwebtoken';
import { UserServices } from '../Services';

declare global {
  module Express {
    export interface Request {
      user: User;
    }
  }
}

const validateJWT = errorWrapper(
  async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
    const id = jwt.verify(token, process.env.SECRET)['id'];
    const user = await UserServices.findUser({ id });
    request.user = user;
    next();
  },
);

export default validateJWT;
