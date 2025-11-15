import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId; // links to Product
  quantity: number;
  color?: string; // color chosen from colorVariants or base color
  images?: string[]; // store selected variant images (optional)
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    color: { type: String },
    images: [{ type: String }]
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", cartSchema);
