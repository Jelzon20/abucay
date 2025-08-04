import mongoose from "mongoose";

const establishmentSchema = new mongoose.Schema({
  establishment: {
    type: String,
    required: true,
  },
  establishment_type: {
    type: String,
  },
  address:{
    type: String,
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
  attachments: {
    type: [String], // array of file names or URLs
    default: [],
  },
  numberOfEmployees: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});
const Establishment = mongoose.model('Establishment', establishmentSchema);

export default Establishment;
