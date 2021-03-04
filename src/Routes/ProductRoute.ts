import { Router } from 'express';
import { ProductGroupController } from '../Controllers';
import { ProductController } from '../Controllers';

const router = Router();

router.post('/bulk', ProductGroupController.createBulkProductGroup);
router.post('', ProductGroupController.createProductGroup);
router.get('', ProductGroupController.getProductGroupList);
router.post('/product', ProductController.createProduct);

export default router;
