import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  president: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
