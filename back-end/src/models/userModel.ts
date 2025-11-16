import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  password: { type: String, required: true },
  userType: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer", required: true },
  companyName: { type: String },
  companyProof: { type: String },
  sellerStatus: { 
    type: String, 
    enum: ["none", "pending", "approved", "rejected"], 
    default: "none" 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);