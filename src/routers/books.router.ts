import { Router } from 'express';

import * as BookController from '../controllers/book.controller';

const router = Router();

router.get('/', BookController.findAllBooks);

export default router;
