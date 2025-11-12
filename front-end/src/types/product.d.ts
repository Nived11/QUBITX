export interface Specification {
  label: string;
  value: string;
}

export interface ColorVariant {
  colorName: string;
  images: string[]; // Backend stored images (URLs)
}

// For form handling (frontend only)
export interface ColorVariantInput {
  colorName: string;
  images: File[]; // New images being uploaded
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
  color?: string;
  images: string[];
  whychoose?: string[];
  specifications?: Specification[];
  colorVariants?: ColorVariant[];
  createdAt?: string;
  updatedAt?: string;
}

// Form data for creating/editing products
export interface ProductFormData {
  name: string;
  actualPrice: string;
  discountedPrice: string;
  category: string;
  brand: string;
  warranty: string;
  description: string;
  whychoose: string[];
  stock: string;
  color: string;
  specifications: Specification[];
  mainImages: File[];
  colorVariants: ColorVariantInput[];
}