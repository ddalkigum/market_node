import { Request, Response } from 'express';
import ProductGroup from '../Entities/productGroup/ProductGroup';
import errorWrapper from '../Errors/errorWrapper';
import ProductGroupServices, {
  CreateProductGroupInput,
  filter,
} from '../Services/ProductGroupServices';

const createBulkProductGroup = errorWrapper(
  async (request: Request, response: Response) => {
    const args: CreateProductGroupInput[] = request.body;
    ProductGroupServices.createBulkItem(args);
    response.status(201).json({ message: 'SUCCESS' });
  },
);

const getProductGroupList = errorWrapper(
  async (request: Request, response: Response) => {
    const { ...data }: filter = request.query;
    const productGroups = await ProductGroupServices.getItems(data);
    response.status(200).json(productGroups);
  },
);

const updateProductGroup = errorWrapper(
  async (request: Request, response: Response) => {
    const { data } = request.body;
    await ProductGroupServices.updateItem(data);
    response.status(200).json({
      message: 'SUCCESS',
    });
  },
);

const deleteProductGroup = errorWrapper(
  async (request: Request, response: Response) => {
    const { data } = request.body;
    await ProductGroupServices.deleteItem(data);
    response.status(200).json({
      message: 'SUCCESS',
    });
  },
);

export default {
  createBulkProductGroup,
  getProductGroupList,
  updateProductGroup,
  deleteProductGroup,
};
