import { Router } from 'express';
import { UserController } from '../Controllers';

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.get('/signin/kakao', UserController.kakaoSignIn);
export default router;
