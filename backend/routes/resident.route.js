import express from 'express';
import {
    getResidents,
    createResident,
    updateResident,
    deleteResident,
    testResidentAPI,
    getResidentsPerMonth,
    getResidentsInSameHousehold
  } from '../controllers/resident.controller.js';
const router = express.Router();

router.get('/test', testResidentAPI);
router.get('/getResidents', getResidents);
router.get('/getResidentsPerMonth', getResidentsPerMonth);
router.post('/createResident', createResident);
router.put('/updateResident/:id', updateResident);
router.delete('/deleteResident/:id', deleteResident);
router.get("/sameHousehold/:id", getResidentsInSameHousehold);




export default router;