import express from 'express';
import { getAllWebsites, createWebsite, getWebsiteById } from '../controllers/website.js';

const router = express.Router();
router.get('/Website/', getAllWebsites);
router.get('/Website/:id', getWebsiteById);
router.post('/Website/create', createWebsite);
export default router;
