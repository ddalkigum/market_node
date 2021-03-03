import { getRepository, Like } from 'typeorm';
import ProductGroup from '../Entities/productGroup/ProductGroup';

const PAGE_SIZE = 10;

export interface CreateProductGroupInput {
  name: string;
  salesUnit: string;
  thumbnail: string;
  deliveryType: string;
  description: string;
  price: number;
  discountRate: number;
}

export interface filter {
  search?: string;
  page?: string;
  sort?: string;
}

interface sortInput {
  word: string;
  sorting: 'DESC' | 'ASC';
}

const sortList: sortInput[] = [
  { word: 'recently', sorting: 'DESC' },
  { word: 'lately', sorting: 'ASC' },
  { word: 'higher', sorting: 'DESC' },
  { word: 'lower', sorting: 'ASC' },
  { word: 'benefit', sorting: 'DESC' },
];

const selectObject = (arr: sortInput[], word: string) => {
  let sortObject = arr.find((item) => {
    if (item.word === word) {
      return item;
    }
  });
  if (sortObject === undefined) {
    sortObject = arr[0];
  }
  return sortObject;
};

const getItems = async (data: filter) => {
  let pageNumber = Number(data.page);
  const filterObject = selectObject(sortList, data.sort);
  if (pageNumber < 0 || isNaN(pageNumber)) pageNumber = 1;
  console.log(typeof data.search);

  const limit = pageNumber * PAGE_SIZE;

  if (filterObject.word === 'higher' || filterObject.word === 'lower') {
    let items = await getRepository(ProductGroup).find({
      where: {
        name: Like(data.search),
        product: {
          name: Like(data.search),
        },
      },
      order: {
        createdAt: filterObject.sorting,
      },
      skip: limit - PAGE_SIZE,
      take: PAGE_SIZE * pageNumber,
      cache: true,
    });
    return items;
  }

  if (filterObject.word === 'benefit') {
    let items = await getRepository(ProductGroup).find({
      where: {
        name: Like(data.search),
        product: {
          name: Like(data.search),
        },
      },
      order: {
        discountRate: filterObject.sorting,
      },
      skip: limit - PAGE_SIZE,
      take: PAGE_SIZE * pageNumber,
      cache: true,
    });
    return items;
  } else {
    let items = await ProductGroup.find({
      skip: limit - PAGE_SIZE,
      take: PAGE_SIZE * pageNumber,
    });
    return items;
  }
};

const createBulkItem = (data: CreateProductGroupInput[]) => {
  data.map(async ({ ...value }) => {
    await ProductGroup.create(value).save();
  });
};

const updateItem = async (data) => {
  const { itemId } = data;
  await ProductGroup.update({ id: itemId }, { ...data });
};

const deleteItem = async (data) => {
  const { itemId } = data;
  await ProductGroup.delete({ id: itemId });
};

export default { getItems, updateItem, deleteItem, createBulkItem };
