import mongoose from "mongoose";

const OrdinanceSchema = new mongoose.Schema(
  {
    ordinanceNo: {
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

    category: {
      type: String,
      enum: [
        "Health",
        "Environment",
        "Traffic",
        "Peace and Order",
        "Business",
        "Youth",
        "Others",
      ],
      default: "Others",
    },

    penalty: String,

    dateFiled: {
      type: Date,
      required: true,
    },

    dateApproved: Date,

    status: {
      type: String,
      enum: ["Draft", "Active", "Repealed"],
      default: "Draft",
    },

    attachments: [String],
  },
  {
    timestamps: true,
  }
);

const Ordinance = mongoose.model("Ordinance", OrdinanceSchema);

export default Ordinance;