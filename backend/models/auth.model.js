import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model ("AuthSchema", AuthSchema);

export default Auth;

