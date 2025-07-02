import Vehicle from "../models/vehicle.model.js";

export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.vehicleId, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.vehicleId);
    if (!deleted) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVehicleStats = async (req, res) => {
  try {
    const stats = await Vehicle.aggregate([
      {
        $group: {
          _id: "$vehicle_type",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 } // optional: sort by highest count
      }
    ]);

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};