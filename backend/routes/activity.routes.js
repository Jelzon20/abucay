import express from "express";
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/addActivity", createActivity);
router.get("/getActivities", getActivities);
router.get("/getActivity/:id", getActivityById);
router.put("/updateActivity/:id", updateActivity);
router.delete("/deleteActivity/:id", deleteActivity);

export default router;
