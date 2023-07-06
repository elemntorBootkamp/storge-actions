import { Router } from 'express';
import { getAllWebsites, addWebsite, deleteWebsit } from '../controllers/website.js';

const router = Router();

router.get('/website/', getAllWebsites);
router.post('/website/', addWebsite);
router.delete('/website/:id', deleteWebsit);

export default router;
