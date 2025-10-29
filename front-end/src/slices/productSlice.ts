import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  actualPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  stock: number;
  images: string[];
}

interface ProductState {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (
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
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setProducts,
  removeProduct,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
