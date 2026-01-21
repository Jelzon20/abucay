import express from "express";
import {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
} from "../controllers/bbi.controller.js";

const router = express.Router();

router.post("/createInstitution", createInstitution);
router.get("/getInstitutions", getInstitutions);
router.get("/getInstitutionById/:id", getInstitutionById);
router.put("/updateInstitution/:id", updateInstitution);
router.delete("/deleteInstitution/:id", deleteInstitution);

export default router;
