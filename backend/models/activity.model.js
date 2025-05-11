import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  organizer: String,
}, {
  timestamps: true,
});

const Activity =  mongoose.model("Activity", ActivitySchema);

export default Activity;
