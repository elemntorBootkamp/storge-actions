import { Router } from 'express';
import {
  getAllWebsites, createWebsite, getWebsiteById, startStopWebsite, deleteWebsit,
} from '../controllers/website.js';

const router = Router();

router.get('/website/', getAllWebsites);
router.get('/Website/:id', getWebsiteById);
router.post('/Website/', createWebsite);
router.put('/website/startStopWebsite/:id', startStopWebsite);
router.delete('/website/:id', deleteWebsit);

export default router;
