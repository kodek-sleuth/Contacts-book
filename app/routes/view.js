import express from 'express';
import {
  viewAll, viewById, viewByEmail, viewByName,
} from '../controllers/view';

const router = express.Router();

router.get('/all', viewAll);
router.get('/name/view', viewByName);
router.get('/email/view', viewByEmail);
router.get('/:id', viewById);
export default router;
