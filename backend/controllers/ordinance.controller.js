import Ordinance from "../models/ordinance.model.js";

// CREATE ORDINANCE
export const createOrdinance = async (req, res) => {
  try {
    const ordinance = await Ordinance.create(req.body);

    res.status(201).json(ordinance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDINANCES
export const getOrdinances = async (req, res) => {
  try {
    const ordinances = await Ordinance.find().sort({
      createdAt: -1,
    });

    res.status(200).json(ordinances);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE ORDINANCE
export const getOrdinanceById = async (req, res) => {
  try {
    const ordinance = await Ordinance.findById(req.params.id);

    if (!ordinance) {
      return res.status(404).json({
        message: "Ordinance not found",
      });
    }

    res.status(200).json(ordinance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDINANCE
export const updateOrdinance = async (req, res) => {
  try {
    const ordinance = await Ordinance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!ordinance) {
      return res.status(404).json({
        message: "Ordinance not found",
      });
    }

    res.status(200).json(ordinance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ORDINANCE
export const deleteOrdinance = async (req, res) => {
  try {
    const ordinance = await Ordinance.findByIdAndDelete(
      req.params.id
    );

    if (!ordinance) {
      return res.status(404).json({
        message: "Ordinance not found",
      });
    }

    res.status(200).json({
      message: "Ordinance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};