import { Router } from 'express';
import { validateRequest } from '../middlewares';
import * as BookController from '../controllers/book.controller';
import { createBookDto } from '../dto';

const router = Router();

router.get('/', BookController.findAllBooks);
router.post(
  '/',
  validateRequest({
    body: createBookDto,
  }),
  BookController.createBook
);

export default router;
