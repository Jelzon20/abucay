import express from "express";
import { createContactReport, getContactReports, updateContactReport } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/createReport", createContactReport);
router.get("/getReports", getContactReports);
router.put("/update/:id", updateContactReport);

export default router;
