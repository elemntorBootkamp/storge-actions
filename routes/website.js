import { Router } from 'express';
import auth from '../middleware/authorization.js';
import { getAllWebsites, addWebsite, deleteWebsit } from '../controllers/website.js';

const router = Router();

router.get('/website/', auth, getAllWebsites);
router.post('/website/', auth, addWebsite);
router.delete('/website/:id', auth, deleteWebsit);

export default router;
