import express from "express";

import {
  createOrdinance,
  getOrdinances,
  getOrdinanceById,
  updateOrdinance,
  deleteOrdinance,
} from "../controllers/ordinance.controller.js";

const router = express.Router();

router.post("/", createOrdinance);

router.get("/", getOrdinances);

router.get("/:id", getOrdinanceById);

router.put("/:id", updateOrdinance);

router.delete("/:id", deleteOrdinance);

export default router;