import Resolution from "../models/resolution.model.js";

// CREATE RESOLUTION
export const addResolution = async (req, res) => {
  try {
    const resolution = await Resolution.create(req.body);

    res.status(201).json(resolution);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL RESOLUTIONS
export const getResolutions = async (req, res) => {
  try {
    const resolutions = await Resolution.find().sort({
      createdAt: -1,
    });

    res.status(200).json(resolutions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE RESOLUTION
export const getResolutionById = async (req, res) => {
  try {
    const resolution = await Resolution.findById(req.params.id);

    if (!resolution) {
      return res.status(404).json({
        message: "Resolution not found",
      });
    }

    res.status(200).json(resolution);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE RESOLUTION
export const updateResolution = async (req, res) => {
  try {
    const resolution = await Resolution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!resolution) {
      return res.status(404).json({
        message: "Resolution not found",
      });
    }

    res.status(200).json(resolution);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE RESOLUTION
export const deleteResolution = async (req, res) => {
  try {
    const resolution = await Resolution.findByIdAndDelete(
      req.params.id
    );

    if (!resolution) {
      return res.status(404).json({
        message: "Resolution not found",
      });
    }

    res.status(200).json({
      message: "Resolution deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};