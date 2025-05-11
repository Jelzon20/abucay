import Lupon from '../models/lupon.model.js'

// Create
export const addLupon = async (req, res) => {
  try {
    const hearing = new Lupon(req.body);
    await hearing.save();
    res.status(201).json(hearing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
export const getAllLupons = async (req, res) => {
  try {
    const hearings = await Lupon.find().sort({ scheduleOfHearing: 1 });
    res.json(hearings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One
export const getLuponById = async (req, res) => {
  try {
    const hearing = await Lupon.findById(req.params.id);
    if (!hearing) return res.status(404).json({ error: "Not found" });
    res.json(hearing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateLupon = async (req, res) => {
  try {
    const updated = await Lupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteLupon = async (req, res) => {
  try {
    const deleted = await Lupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
