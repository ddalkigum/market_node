import { Router } from 'express';
import CategoryController from '../Controllers/CategoryController';

const router = Router();

router.post('', CategoryController.createCategory);

export default router;
