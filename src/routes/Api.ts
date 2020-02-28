
import { Router } from 'express';


import HomeController  from '../controllers/HomeController';

const router = Router();

router.get('/', HomeController.index);

export default router;
