import { Router } from 'express';
import { ProductGroupController } from '../Controllers';
import { ProductController } from '../Controllers';

const router = Router();

router.post('', ProductGroupController.createBulkProductGroup);
router.get('', ProductGroupController.getProductGroupList);
router.post('/product', ProductController.createProduct);

export default router;
