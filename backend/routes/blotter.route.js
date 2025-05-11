// routes/blotterRoutes.js
import express from "express";
import {
  getBlotters,
  getBlotterById,
  createBlotter,
  updateBlotter,
  deleteBlotter,
} from "../controllers/blotter.controller.js";

const router = express.Router();

router.get("/getBlotters", getBlotters);
router.get("/getBlotterById/:id", getBlotterById);
router.post("/addBlotter", createBlotter);
router.put("/updateBlotter/:id", updateBlotter);
router.delete("/deleteBlotter/:id", deleteBlotter);

export default router;
