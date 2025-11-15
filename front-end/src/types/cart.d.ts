// src/types/cart.ts

import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  images: string[];
}

export interface Cart {
  _id?: string;
  user: string;
  items: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}