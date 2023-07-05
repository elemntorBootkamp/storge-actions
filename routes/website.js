import { Router } from 'express';
import { getAllWebsites, createWebsite, getWebsiteById } from '../controllers/website.js';

const router = Router();
router.get('/Website/', getAllWebsites);
router.get('/Website/:id', getWebsiteById);
router.post('/Website/create', createWebsite);

export default router;
