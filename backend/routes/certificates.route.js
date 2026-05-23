import express from 'express';
import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
  getCertificatesByUserId
} from '../controllers/certificates.controller.js';

const router = express.Router();

router.post('/addCertificate', createCertificate);
router.get('/getCertificates', getCertificates);
router.get('/getCertificatesByUserId/:id', getCertificatesByUserId);
router.get('/getCertificate/:id', getCertificateById);
router.put('/updateCertificate/:id', updateCertificate);
router.delete('/deleteCertificate/:id', deleteCertificate);

export default router;
