import mongoose from "mongoose";

const luponSchema = new mongoose.Schema({
  defendant: {
    type: String,
    required: true,
  },
  complainant: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  scheduleOfHearing: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
  },
}, { timestamps: true });

const Lupon = mongoose.model("Lupon", luponSchema);

export default Lupon;
