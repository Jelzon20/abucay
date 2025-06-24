import mongoose from "mongoose";

const brgyDisputeSchema = new mongoose.Schema(
  {
    defendant: { type: String, required: true },
    complainant: { type: String, required: true },
    complaint: { type: String, required: true },
    description: { type: String },
    mediatedBy: { type: String },
    date: { type: Date, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

const BrgyDispute = mongoose.model("BrgyDispute", brgyDisputeSchema);
export default BrgyDispute;
