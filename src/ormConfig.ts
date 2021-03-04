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

const testConnectionOption: ConnectionOptions = {
  type: 'mysql',
  host: process.env.TEST_HOST,
  password: process.env.TEST_PASSWORD,
  username: process.env.TEST_USER,
  database: process.env.TEST_NAME,
  synchronize: true,
  port: 3306,
  entities: [__dirname + '/Entities/**/*.*'],
};

export default { devConnectionOption, testConnectionOption };
