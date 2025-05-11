// models/Blotter.js
import mongoose from "mongoose";

const blotterSchema = new mongoose.Schema({
  incident: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  takenBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Blotter = mongoose.model("Blotter", blotterSchema);

export default Blotter;
