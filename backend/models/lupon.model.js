import mongoose from "mongoose";

const luponSchema = new mongoose.Schema({
   defendant: { type: String, required: true },
  complainant: { type: String, required: true },
  complaint: { type: String, required: true },
  description: { type: String },
  endorsedFromDisputeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BrgyDispute',
  },
  luponMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LuponMember',
    }
  ],
  scheduleOfHearing: { type: Date },
  status: {
    type: String,
  },
}, { timestamps: true });

const Lupon = mongoose.model("Lupon", luponSchema);

export default Lupon;
