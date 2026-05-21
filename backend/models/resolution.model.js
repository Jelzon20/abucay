import mongoose from "mongoose";

const ResolutionSchema = new mongoose.Schema(
  {
    resolutionNo: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    committee: String,

    dateFiled: {
      type: Date,
      required: true,
    },

    dateApproved: Date,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    attachments: [String],
  },
  {
    timestamps: true,
  }
);

const Resolution = mongoose.model("Resolution", ResolutionSchema);

export default Resolution;