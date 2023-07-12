import { Router } from 'express';
import { getAllBackups, addBackup } from '../controllers/backup.js';

const router = Router();

router.get('/backup/getAllBackups', getAllBackups);
router.post('/backup/', addBackup);

export default router;
