import express from 'express';
import { MessageResponse } from '../interfaces';
import env from '../env';
import api from '../routers';
import * as middlewares from '../middlewares';
const expressApp = express();

expressApp.use(express.json());

expressApp.get<Record<string, never>, MessageResponse>('/', (req, res: express.Response) => {
  res.json({
    message: `${env.APP.NAME} is up and running.`,
  });
});
expressApp.use('/api/v1', api);

expressApp.use(middlewares.errorHandler);

export default expressApp;
