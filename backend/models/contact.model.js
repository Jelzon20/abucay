import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    issueType: {
      type: String,
      required: true,
    },
    otherIssue: {
      type: String,
    },
    address: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    preferredContact: {
      type: String,
    },
     comments: {
      type: Array,
      default: [],
    },
    state: {
      type: String,
      default: "New",
    },
    consent: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;