import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product"; 

interface ProductState {
  productCache: Record<string, Product>;
  products: Product[];
  productDetails: Product | null;
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  lastFetchedUserType: string | null; 
}

const initialState: ProductState = {
  productCache: {},
  products: [],
  productDetails: null,
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  lastFetchedUserType: null, 
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
        userType: string | null;  
      }>
    ) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;

      action.payload.products.forEach((product) => {
        state.productCache[product._id] = product;
      });

      state.lastFetchedUserType = action.payload.userType;
    },

    setProductDetails: (state, action: PayloadAction<Product | null>) => {
      if (action.payload) {
        state.productCache[action.payload._id] = action.payload;
      }
      state.productDetails = action.payload;
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
      delete state.productCache[action.payload];
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setProductDetails,
  removeProduct,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
