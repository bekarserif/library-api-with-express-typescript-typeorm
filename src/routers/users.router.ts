import { Router } from 'express';
import * as UsersController from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import { createUserDto, paramsWithId } from '../dto';
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

export default router;
