import mongoose from "mongoose";

const establishmentSchema = new mongoose.Schema({
  establishment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
  },
  dateEstablished: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true
});
const Establishment = mongoose.model('Establishment', establishmentSchema);

export default Establishment;
