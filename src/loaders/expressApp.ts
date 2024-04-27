import express from 'express';
import MessageResponse from '../interfaces/messageResponse';
import env from '../env';
const expressApp = express();

expressApp.use(express.json());

expressApp.get<Record<string, never>, MessageResponse>('/', (req, res: express.Response) => {
  res.json({
    message: `${env.APP.NAME} is up and running.`,
  });
});

export default expressApp;
