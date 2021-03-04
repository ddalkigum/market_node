import { getRepository } from 'typeorm';
import User from '../Entities/user/User';

export interface UserFind {
  id?: number;
  email?: string;
}

export interface UserCreateInput {
  email: string;
  password?: string;
  name?: string;
}

export interface UserSignInInput {
  email: string;
  password?: string;
}

const findUser = async (data: UserFind) => {
  const [key] = Object.keys(data);
  return await User.findOne({ [key]: data[key] });
};

const createUser = async (data: UserCreateInput) => {
  await getRepository<User>(User).create(data).save();
};

export default { findUser, createUser };
