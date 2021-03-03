import { Router } from 'express';
import UserRoute from './UserRoute';
import ProductGroupRoute from './ProductRoute';
import CategoryRoute from './CategoryRoute';

const router = Router();

router.use('/users', UserRoute);
router.use('/products', ProductGroupRoute);
router.use('/categories', CategoryRoute);

export default router;
