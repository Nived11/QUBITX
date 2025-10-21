import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String },
  otp: { type: String, required: true },
  userType: { type: String, enum: ["buyer", "seller"] },
  companyName: { type: String },
  companyProof: { type: String },
  purpose: { type: String, enum: ["signup", "forgot-password"], required: true },
  expiresAt: { type: Date, default: () => Date.now() + 1 * 60 * 1000 } // 1 minute expiration
},{ timestamps: true });

export const Otp = mongoose.model("Otp", otpSchema);
