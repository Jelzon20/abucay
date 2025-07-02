import express from 'express';
import { addEstablishment, getEstablishmentById, getEstablishments, updateEstablishment, deleteEstablishment, testEstablishment, getEstablishmentStats, } from '../controllers/establishment.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/testEstablishment', testEstablishment);
router.post('/addEstablishment', addEstablishment);
router.get('/getEstablishmentById/:establishmentId', getEstablishmentById);
router.get('/getEstablishments', getEstablishments);
router.put('/updateEstablishment/:establishmentId', updateEstablishment);
router.delete('/deleteEstablishment/:establishmentId', deleteEstablishment);
router.get("/getEstablishmentStats", getEstablishmentStats);

export default router;