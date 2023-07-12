import { Router } from 'express';
import { getAllWebsites } from '../controllers/website.js';

const router = Router();

router.get('/website/', getAllWebsites);

export default router;
