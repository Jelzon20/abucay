import Activity from "../models/activity.model.js";

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Not found" });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an activity
export const updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
