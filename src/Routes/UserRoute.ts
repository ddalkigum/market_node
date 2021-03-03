import { Router } from 'express';
import { UserController } from '../Controllers';
import validateJWT from '../Middlewares/validateJWT';

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

export default router;
