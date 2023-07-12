import { Router } from 'express';
import auth from '../middleware/authorization.js';
import {
  getAllWebsites, createWebsite, getWebsiteById, startStopWebsite, deleteWebsit,
} from '../controllers/website.js';

const router = Router();

router.get('/website/', getAllWebsites);
router.get('/Website/:id', getWebsiteById);
router.post('/Website/', createWebsite);
router.delete('/website/:id', auth, deleteWebsit);
router.put('/website/startStopWebsite/:id', startStopWebsite);
export default router;
