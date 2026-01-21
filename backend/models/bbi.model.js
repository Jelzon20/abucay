import mongoose from "mongoose";

const BarangayInstitutionSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      trim: true,
    },
    typeOthers: {
      type: String,
      trim: true,
    },
    photo: {
        type: String
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    purokAssigned: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const BarangayInstitution = mongoose.model ("BarangayInstitution", BarangayInstitutionSchema);

export default BarangayInstitution;

