import express from 'express';
import {
  createOfficial,
  getOfficials,
  getOfficialById,
  updateOfficial,
  deleteOfficial,
} from '../controllers/officials.controller.js';

const router = express.Router();

router.post('/addOfficial', createOfficial);
router.get('/getOfficials', getOfficials);
router.get('/getOfficial/:id', getOfficialById);
router.put('/updateOfficial/:id', updateOfficial);
router.delete('/deleteOfficial/:id', deleteOfficial);

export default router;
