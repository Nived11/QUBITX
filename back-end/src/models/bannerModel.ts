// models/bannerModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBanner extends Document {
  name: string;
  image: string; // URL to banner image
  productId: mongoose.Types.ObjectId;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBanner>("Banner", bannerSchema);
