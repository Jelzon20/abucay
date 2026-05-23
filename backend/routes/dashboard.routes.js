import express from "express";
import {
  getResidentCount,
  getResolutionCount,
  getContactRequestCount,
  getBrgyDisputeCount
  
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/getResidentCount", getResidentCount);
router.get("/getResolutionCount", getResolutionCount);
router.get("/getContactRequestCount", getContactRequestCount);
router.get("/getBrgyDisputeCount", getBrgyDisputeCount);

export default router;
