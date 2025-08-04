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
  contact_number: {
    type: String
  },
  address: {
    type: String
  }
}, {
  timestamps: true,
});

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
