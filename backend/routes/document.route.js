import express from 'express';
import { addDocument, getDocuments, updateDocument, deleteDocument, test } from '../controllers/document.controller.js';

const router = express.Router();

router.get('/test', test);
router.post('/addDocument', addDocument);
router.get('/getDocuments', getDocuments);
router.put('/updateDocument/:id', updateDocument);
router.delete('/deleteDocument/:id', deleteDocument);


export default router;