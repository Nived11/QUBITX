import mongoose, { Schema, Document } from "mongoose";

export interface ISpecification {
  label: string;
  value: string;
}

export interface IColorVariant {
  colorName: string;
  images: string[];
}

export interface IProduct extends Document {
  seller: mongoose.Types.ObjectId;
  name: string;
  actualPrice: number;
  discountPercentage?: number;
  discountedPrice: number;
  category: string;
  brand: string;
  warranty?: string;
  description: string;
  whychoose: string[];
  stock: number;
  specifications: ISpecification[];
  images: string[];
  colorVariants: IColorVariant[];
}

const specificationSchema = new Schema<ISpecification>({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const colorVariantSchema = new Schema<IColorVariant>({
  colorName: { type: String, required: true },
  images: {
    type: [String],
    validate: [(arr: string[]) => arr.length <= 5, "Max 5 images per color variant"],
  },
});

const productSchema = new Schema<IProduct>(
  {
     seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    actualPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    discountedPrice: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    warranty: { type: String },
    description: { type: String, required: true },
    whychoose: [{ type: String }],
    stock: { type: Number, required: true },
    specifications: [specificationSchema],
    images: {
      type: [String],
      validate: [(arr: string[]) => arr.length <= 5, "Max 5 images allowed"],
    },
    colorVariants: [colorVariantSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
