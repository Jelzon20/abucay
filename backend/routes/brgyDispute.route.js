import express from 'express';
import {
  getAllDisputes,
  getDisputeById,
  createDispute,
  updateDispute,
  deleteDispute
} from '../controllers/brgyDispute.controller.js';

const router = express.Router();

router.get('/getAllDisputes', getAllDisputes);
router.get('/getDisputeById/:id', getDisputeById);
router.post('/createDispute', createDispute);
router.put('/updateDispute/:id', updateDispute);
router.delete('/deleteDispute/:id', deleteDispute);

export default router;
