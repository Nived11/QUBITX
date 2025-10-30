// src/types/product.ts
export interface Specification {
  label: string;
  value: string;
}

export interface ColorVariant {
  colorName: string;
  images: string[];
}

export interface Product {
  _id: string;
  seller?: string;
  name: string;
  brand: string;
  category: string;
  actualPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  warranty?: string;
  stock: number;
  description?: string;
  images: string[];
  whychoose?: string[];
  specifications?: Specification[];
  colorVariants?: ColorVariant[];
  createdAt?: string;
  updatedAt?: string;
}
