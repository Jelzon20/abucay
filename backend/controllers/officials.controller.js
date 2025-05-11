import Officials from '../models/officials.model.js';

// Create
export const createOfficial = async (req, res) => {
  try {
    const official = new Officials(req.body);
    await official.save();
    res.status(201).json(official);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all
export const getOfficials = async (req, res) => {
  try {
    const officials = await Officials.find().sort({ position: 1 });
    res.status(200).json(officials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read one
export const getOfficialById = async (req, res) => {
  try {
    const official = await Officials.findById(req.params.id);
    if (!official) return res.status(404).json({ message: 'Official not found' });
    res.status(200).json(official);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateOfficial = async (req, res) => {
  try {
    const updated = await Officials.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Official not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const deleteOfficial = async (req, res) => {
  try {
    const removed = await Officials.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Official not found' });
    res.status(200).json({ message: 'Official deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
