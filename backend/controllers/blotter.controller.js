// controllers/blotterController.js
import Blotter from "../models/blotter.model.js";

export const getBlotters = async (req, res) => {
  try {
    const blotters = await Blotter.find().sort({ date: -1 });
    res.json(blotters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlotterById = async (req, res) => {
  try {
    const blotter = await Blotter.findById(req.params.id);
    if (!blotter) return res.status(404).json({ error: "Not found" });
    res.json(blotter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlotter = async (req, res) => {
  try {
    const { incident, description, takenBy, date } = req.body;
    const newBlotter = new Blotter({ incident, description, takenBy, date });
    await newBlotter.save();
    res.status(201).json(newBlotter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlotter = async (req, res) => {
  try {
    const updated = await Blotter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlotter = async (req, res) => {
  try {
    const deleted = await Blotter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Blotter deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
