import BarangayInstitution from "../models/bbi.model.js";

// Create
export const createInstitution = async (req, res) => {
  try {
    const newInstitution = await BarangayInstitution.create(req.body);
    res.status(201).json(newInstitution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all
export const getInstitutions = async (req, res) => {
  try {
    const institutions = await BarangayInstitution.find().sort({ createdAt: -1 });
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read one
export const getInstitutionById = async (req, res) => {
  try {
    const institution = await BarangayInstitution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: "Not found" });
    res.status(200).json(institution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateInstitution = async (req, res) => {
  try {
    const updatedInstitution = await BarangayInstitution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedInstitution) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updatedInstitution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const deleteInstitution = async (req, res) => {
  try {
    const deletedInstitution = await BarangayInstitution.findByIdAndDelete(req.params.id);
    if (!deletedInstitution) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
