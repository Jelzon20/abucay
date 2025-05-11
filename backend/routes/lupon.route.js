import express from "express";
import {
  addLupon,
  getAllLupons,
  getLuponById,
  updateLupon,
  deleteLupon,
} from "../controllers/lupon.controller.js";

const router = express.Router();

router.post("/addLupon", addLupon);
router.get("/getLupons", getAllLupons);
router.get("/getLupon/:id", getLuponById);
router.put("/updateLupon/:id", updateLupon);
router.delete("/deleteLupon/:id", deleteLupon);

export default router;
