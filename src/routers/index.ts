import express from 'express';
import MessageResponse from '../interfaces/messageResponse';
import UserRouter from './users.router';

const router = express.Router();

router.get<Record<string, never>, MessageResponse>('/', (req, res: express.Response) => {
  res.json({
    message: `Healthy api v1 response`,
  });
});

router.use('/users', UserRouter);

export default router;
