import { Router } from 'express';
import { validateRequest } from '../middlewares';
import * as BookController from '../controllers/book.controller';
import { createBookDto, paramsWithId } from '../dto';

const router = Router();

router.get('/', BookController.findAllBooks);
router.get(
  '/:id',
  validateRequest({
    params: paramsWithId,
  }),
  BookController.findBookById
);
router.post(
  '/',
  validateRequest({
    body: createBookDto,
  }),
  BookController.createBook
);

export default router;
