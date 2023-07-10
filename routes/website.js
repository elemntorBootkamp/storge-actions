import { Router } from 'express';
import auth from '../middleware/authorization.js';
import {
  getAllWebsites, addWebsite, deleteWebsit, startStopWebsite,
} from '../controllers/website.js';

const router = Router();
router.get('/website/', auth, getAllWebsites);
router.post('/website/', auth, addWebsite);
router.delete('/website/:id', auth, deleteWebsit);
router.put('/website/startStopWebsite/:id', startStopWebsite);
export default router;
