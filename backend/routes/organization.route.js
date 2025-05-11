import express from "express";
import {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organization.controller.js";

const router = express.Router();

router.post("/addOrg", createOrganization);
router.get("/getOrgs", getOrganizations);
router.get("/getOrg/:id", getOrganizationById);
router.put("/updateOrg/:id", updateOrganization);
router.delete("/deleteOrg/:id", deleteOrganization);

export default router;
