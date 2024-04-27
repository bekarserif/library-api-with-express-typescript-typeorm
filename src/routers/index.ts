import express from 'express';
import MessageResponse from '../interfaces/messageResponse';

const router = express.Router();

router.get<Record<string, never>, MessageResponse>('/', (req, res: express.Response) => {
  res.json({
    message: `Healthy api v1 response`,
  });
});

export default router;
