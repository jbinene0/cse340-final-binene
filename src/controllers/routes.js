import { Router } from 'express';
import { homePage } from './index.js';
import { vehicleDetailPage, categoryPage } from './vehicles/vehicles.js';

const router = Router();

router.get('/', homePage);
router.get('/vehicle/:id', vehicleDetailPage);
router.get('/category/:category', categoryPage);

export default router;