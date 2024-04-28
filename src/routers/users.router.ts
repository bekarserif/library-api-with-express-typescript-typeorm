import { Router } from 'express';
import * as UsersController from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import { userIdBookIdParams, createUserDto, paramsWithId, returnBookDto } from '../dto';
const router = Router();

router.get('/', UsersController.findAllUsers);
router.get(
  '/:id',
  validateRequest({
    params: paramsWithId,
  }),
  UsersController.findUserById
);

router.post(
  '/',
  validateRequest({
    body: createUserDto,
  }),
  UsersController.createUser
);

router.post(
  '/:userId/borrow/:bookId',
  validateRequest({
    params: userIdBookIdParams,
  }),
  UsersController.borrowBookForUser
);

router.post(
  '/:userId/return/:bookId',
  [
    validateRequest({
      params: userIdBookIdParams,
    }),
    validateRequest({
      body: returnBookDto,
    }),
  ],
  UsersController.returnBookForUser
);

export default router;
