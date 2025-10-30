import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

interface SellerProductState {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: SellerProductState = {
  products: [],
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState,
  reducers: {
    setSellerLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSellerProducts: (
      state,
      action: PayloadAction<{
        products: Product[];
        totalProducts: number;
        totalPages: number;
        currentPage: number;
      }>
    ) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    removeSellerProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p._id !== action.payload);
    },
    setSellerError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSellerLoading,
  setSellerProducts,
  removeSellerProduct,
  setSellerError,
} = sellerProductSlice.actions;

export default sellerProductSlice.reducer;
