import express from 'express';
import contactController from '../controllers/contactController';

const router = express.Router();

router.post('/', contactController.createContact);

router.patch('/:id', contactController.createContact);

export default router;