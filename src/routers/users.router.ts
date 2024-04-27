import { Router } from 'express';
import * as UsersController from '../controllers/user.controller';
const router = Router();

router.get('/', UsersController.findAllUsers);
router.get('/:id', UsersController.findUserById);
router.post('/', UsersController.createUser);

export default router;
