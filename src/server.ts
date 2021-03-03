import { createServer } from 'http';
import { createConnection } from 'typeorm';
import app from './app';
import ormConfig from './ormConfig';

const server = createServer(app);

const dbConnect = async () => {
  await createConnection(ormConfig.devConnectionOption);
};

dbConnect();

server.listen(3000, () => {
  console.log(`Server start on 3000`);
});
