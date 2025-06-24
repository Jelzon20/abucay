import BrgyDispute from '../models/brgyDispute.model.js';
import Lupon from '../models/lupon.model.js'; // Adjust path as needed

// GET all disputes
export const getAllDisputes = async (req, res) => {
  try {
    const disputes = await BrgyDispute.find();
    res.status(200).json(disputes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET dispute by ID
export const getDisputeById = async (req, res) => {
  try {
    const dispute = await BrgyDispute.findById(req.params.id);
    if (!dispute) return res.status(404).json({ message: "Not found" });
    res.status(200).json(dispute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new dispute
export const createDispute = async (req, res) => {
  try {
    const newDispute = new BrgyDispute(req.body);
    const savedDispute = await newDispute.save();
    res.status(201).json(savedDispute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a dispute

export const updateDispute = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const existing = await BrgyDispute.findById(id);
    if (!existing) return res.status(404).json({ message: "Dispute not found" });

    const updated = await BrgyDispute.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (
      updatedFields.status === 'Endorsed' &&
      existing.status !== 'Endorsed'
    ) {
      const existingLupon = await Lupon.findOne({ endorsedFromDisputeId: id });
      if (!existingLupon) {
        await Lupon.create({
          defendant: updated.defendant,
          complainant: updated.complainant,
          complaint: updated.complaint,
          description: updated.description,
          endorsedFromDisputeId: updated._id,
        });
      }
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE a dispute
export const deleteDispute = async (req, res) => {
  try {
    const deleted = await BrgyDispute.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
