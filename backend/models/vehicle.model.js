import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  number: { type: String, required: true },
  owner: { type: String, required: true },
  driver: { type: String, required: true },
  dateRegistered: { type: Date },
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;