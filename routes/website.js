import { Router } from 'express';
import auth from '../middleware/authorization.js';
import {
  getAllWebsites, createWebsite, getWebsiteById,
  startStopWebsite, deleteWebsit, getAllCPUValuesController,
} from '../controllers/website.js';

const router = Router();

router.get('/website/', auth, getAllWebsites);
router.get('/website/cpu', auth, getAllCPUValuesController);
router.get('/Website/:id', auth, getWebsiteById);
router.post('/Website/', auth, createWebsite);
router.delete('/website/:id', auth, deleteWebsit);
router.put('/website/startStopWebsite/:id', auth, startStopWebsite);
export default router;
