import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import generalErrorHandler from './Errors/generalErrorHandler';
import Routes from './Routes';

const app = express();

app.options('*', cors());
app.use(express.json());
app.use(logger('dev'));
app.use(Routes);
app.use(generalErrorHandler);

export default app;
