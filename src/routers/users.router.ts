import { Router } from 'express';
import * as UsersController from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import { createUserDto } from '../dto/createUser.dto';
const router = Router();

router.get('/', UsersController.findAllUsers);
router.get('/:id', UsersController.findUserById);
router.post(
  '/',
  validateRequest({
    body: createUserDto,
  }),
  UsersController.createUser
);

export default router;
