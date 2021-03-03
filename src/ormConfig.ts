import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { ConnectionOptions } from 'typeorm';

const devConnectionOption: ConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST,
  password: process.env.PASSWORD,
  username: process.env.USER,
  database: process.env.NAME,
  logging: true,
  synchronize: true,
  port: 3306,
  entities: [__dirname + '/Entities/**/*.*'],
};

export const testConnectionOption: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  password: '1234',
  username: 'root',
  database: 'test_sua',
  synchronize: true,
  port: 3306,
  entities: [__dirname + '/Entities/**/*.*'],
};
export default { devConnectionOption };
