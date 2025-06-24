import Resident from "../models/resident.model.js";

export const getResidents = async (req, res, next) => {
  try {
    const residents = await Resident.find();
    res.json(residents);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch residents"));
  }
};

export const testResidentAPI = async (req, res, next) => {
  res.json('We are connected!');
};

export const createResident = async (req, res) => {
  try {
    const newResident = new Resident(req.body);
    await newResident.save();
    res.status(201).json(newResident);
  } catch (error) {
    next(errorHandler(400, "Failed to create resident"));
  }
};

export const updateResident = async (req, res) => {
  try {
    const updatedResident = await Resident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedResident);
  } catch (error) {
    next(errorHandler(400, "Failed to update resident - backend"));
  }
};

export const deleteResident = async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resident deleted successfully' });
  } catch (error) {
    next(errorHandler(500, "Failed to delete resident"));
  }
};

// Helper function to convert month number to month name
const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
};

export const getResidentsPerMonth = async (req, res, next) => {
  try {
    const result = await Resident.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format with month name
    const formattedResult = result.map(item => ({
      month: getMonthName(item._id), // convert number to name
      count: item.count,
    }));

    res.json(formattedResult);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch residents per month"));
  }
};

export const getResidentsInSameHousehold = async (req, res) => {
  try {
    const targetId = req.params.id;

    const targetResident = await Resident.findById(targetId);
    if (!targetResident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    const sameHousehold = await Resident.find({
      household_no: targetResident.household_no,
      _id: { $ne: targetResident._id }
    });

    res.json({
      target: targetResident,
      othersInSameHousehold: sameHousehold
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
