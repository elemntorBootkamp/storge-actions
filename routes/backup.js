import { Router } from 'express';
import { getAllBackups, addBackup, backupSite } from '../controller/backup.js';

const router = Router();

router.get('/backup/', getAllBackups);
router.post('/backup/', addBackup);
router.post('/backup/:id', backupSite);

export default router;
