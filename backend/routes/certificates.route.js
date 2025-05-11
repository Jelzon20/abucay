import express from 'express';
import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificates.controller.js';

const router = express.Router();

router.post('/addCertificate', createCertificate);
router.get('/getCertificates', getCertificates);
router.get('/:id', getCertificateById);
router.put('/updateCertificate/:id', updateCertificate);
router.delete('/deleteCertificate/:id', deleteCertificate);

export default router;
