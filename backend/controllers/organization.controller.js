import Organization from "../models/organization.model.js";

// Create a new organization
export const createOrganization = async (req, res) => {
  try {
    const org = new Organization(req.body);
    const savedOrg = await org.save();
    res.status(201).json(savedOrg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all organizations
export const getOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single organization by ID
export const getOrganizationById = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);
    if (!org) return res.status(404).json({ message: "Not found" });
    res.json(org);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an organization
export const updateOrganization = async (req, res) => {
  try {
    const updatedOrg = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrg) return res.status(404).json({ message: "Not found" });
    res.json(updatedOrg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an organization
export const deleteOrganization = async (req, res) => {
  try {
    const deleted = await Organization.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Organization deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
