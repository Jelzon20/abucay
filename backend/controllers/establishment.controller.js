import Establishment from '../models/establishments.model.js';

// Create new establishment
export const testEstablishment = async (req, res) => {
   res.json('Connected');
  };

// Create new establishment
export const addEstablishment = async (req, res) => {
  try {
    const establishment = new Establishment(req.body);
    const saved = await establishment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all establishments
export const getEstablishments = async (req, res) => {
  try {
    const establishments = await Establishment.find();
    res.json(establishments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single establishment by ID
export const getEstablishmentById = async (req, res) => {
  try {
    const establishment = await Establishment.findById(req.params.establishmentId);
    if (!establishment) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(establishment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update establishment
export const updateEstablishment = async (req, res) => {
  try {
    const updated = await Establishment.findByIdAndUpdate(req.params.establishmentId, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete establishment
export const deleteEstablishment = async (req, res) => {
  try {
    const deleted = await Establishment.findByIdAndDelete(req.params.establishmentId);
    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEstablishmentStats = async (req, res) => {
  try {
    const stats = await Establishment.aggregate([
      {
        $group: {
          _id: "$establishment_type",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }
      }
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};