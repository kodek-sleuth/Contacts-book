import express from 'express';
import contactController from '../controllers/contactController';

const router = express.Router();
router.post('/create', contactController.createContact);
router.patch('/:id/update', contactController.updateContact);
router.delete('/:id/delete', contactController.deleteContact);

export default router;
