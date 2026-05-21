import express from "express";

import {
  addResolution,
  getResolutions,
  getResolutionById,
  updateResolution,
  deleteResolution,
} from "../controllers/resolutions.controller.js";

const router = express.Router();

router.post("/addResolution", addResolution);

router.get("/getResolutions", getResolutions);

router.get("/getResolutionById/:id", getResolutionById);

router.put("/updateResolution/:id", updateResolution);

router.delete("/deleteResolution/:id", deleteResolution);

export default router;