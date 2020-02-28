
import { Router } from 'express';

import Locals from '../providers/Locals';

import HomeController  from '../controllers/HomeController';

const router = Router();

router.get('/', HomeController.index);

export default router;
