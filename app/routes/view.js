import express from 'express';
import contactController from '../controllers/contactController';

const router = express.Router();

router.get('/all', contactController.viewAll);
router.get('/view/email', contactController.viewByEmail);
router.get('/view/name', contactController.viewByName);
router.get('/view/:id', contactController.viewById);

export default router;
