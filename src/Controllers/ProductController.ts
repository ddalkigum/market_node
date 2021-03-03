import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import Product from '../Entities/product/Product';
import errorWrapper from '../Errors/errorWrapper';

const createProduct = errorWrapper(
  async (request: Request, response: Response) => {
    response.status(201).json({
      message: 'SUCCESS',
    });
  },
);

export default { createProduct };
