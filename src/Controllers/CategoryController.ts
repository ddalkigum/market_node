import { Request, Response } from 'express';
import Category from '../Entities/category/Category';
import errorWrapper from '../Errors/errorWrapper';

const createCategory = errorWrapper(
  async (request: Request, response: Response) => {
    const { ...args } = request.body;
    const { name } = args;
    for (const categoryName of name) {
      await Category.create({ name: categoryName }).save();
    }
    response.status(201).json({
      message: 'SUCCESS',
    });
  },
);
export default { createCategory };
