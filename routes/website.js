import { Router } from 'express';
import { getAllWebsites, addWebsite, startStopWebsite, deleteWebsit } from '../controllers/website.js';

const router = Router();

router.get('/website/', getAllWebsites);
router.post('/website/', addWebsite);
router.put('/website/startStopWebsite/:id', startStopWebsite);

export default router;
