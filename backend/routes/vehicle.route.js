import express from 'express';
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehicleStats,
} from '../controllers/vehicle.controller.js'

const router = express.Router();

router.post('/addVehicle', createVehicle);
router.get('/getVehicles', getAllVehicles);
router.get('/getVehicle/:vehicleId', getVehicleById);
router.put('/updateVehicle/:vehicleId', updateVehicle);
router.delete('/deleteVehicle/:vehicleId', deleteVehicle);
router.get("/getVehicleStats", getVehicleStats);

export default router;
