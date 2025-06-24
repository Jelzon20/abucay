import LuponMember from '../models/luponMember.model.js';

// Create new member
export const createLuponMember = async (req, res) => {
  try {
    const member = await LuponMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all members
export const getAllLuponMembers = async (req, res) => {
  try {
    const members = await LuponMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one member by ID
export const getLuponMemberById = async (req, res) => {
  try {
    const member = await LuponMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update member
export const updateLuponMember = async (req, res) => {
  try {
    const updated = await LuponMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete member
export const deleteLuponMember = async (req, res) => {
  try {
    await LuponMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
