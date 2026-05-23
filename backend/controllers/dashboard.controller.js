import BrgyDispute from "../models/brgyDispute.model.js";
import Contact from "../models/contact.model.js";
import Resident from "../models/resident.model.js";
import Resolution from "../models/resolution.model.js";

export const getResidentCount = async (req, res) => {
  try {
    const totalResidents = await Resident.countDocuments();

    res.status(200).json({
      success: true,
      totalResidents,
    });
  } catch (error) {
    console.error("Error fetching resident count:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resident count",
    });
  }
};

export const getResolutionCount = async (req, res) => {
  try {
    const totalResolutions = await Resolution.countDocuments();

    res.status(200).json({
      success: true,
      totalResolutions,
    });
  } catch (error) {
    console.error("Error fetching resolutions and ordinances count:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resolutions and ordinances count",
    });
  }
};

export const getContactRequestCount = async (req, res) => {
  try {
    const totalContactRequests = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      totalContactRequests,
    });
  } catch (error) {
    console.error("Error fetching contact request count:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch contact requests count",
    });
  }
};

export const getBrgyDisputeCount = async (req, res) => {
  try {
    const totalBrgyDisputes = await BrgyDispute.countDocuments();

    res.status(200).json({
      success: true,
      totalBrgyDisputes,
    });
  } catch (error) {
    console.error("Error fetching barangay disputes count:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch barangay disputes count",
    });
  }
};