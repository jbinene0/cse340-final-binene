import { Router } from 'express';
import { homePage } from './index.js';
import { vehicleDetailPage } from './vehicles/vehicles.js';

const router = Router();

router.get('/', homePage);
router.get('/vehicle/:id', vehicleDetailPage);

export default router;