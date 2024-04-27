import { Router } from 'express';
import * as UsersController from '../controllers/user.controller';
const router = Router();

router.get('/users', UsersController.findAllUsers);

export default router;
