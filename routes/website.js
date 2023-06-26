import { Router } from 'express';
import { getAllWebsites, addWebsite } from '../controllers/website.js';

const router = Router();

router.get('/website/', getAllWebsites);
router.post('/website/', addWebsite);

export default router;
