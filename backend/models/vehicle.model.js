import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  number: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  owner: { type: String },
  owner_contactNumber: { type: String },
  owner_address: { type: String },
  driver: { type: String },
  driver_contactNumber: { type: String },
  driver_address: { type: String },
  dateRegistered: { type: Date },
  driver_photo: {
    type: String
  },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;