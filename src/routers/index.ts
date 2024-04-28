import express from 'express';
import { MessageResponse } from '../dto';
import UserRouter from './users.router';
import BookRouter from './books.router';

const router = express.Router();

router.get<Record<string, never>, MessageResponse>('/', (req, res: express.Response) => {
  res.json({
    message: `Healthy api v1 response`,
  });
});

router.use('/users', UserRouter);
router.use('/books', BookRouter);

export default router;
