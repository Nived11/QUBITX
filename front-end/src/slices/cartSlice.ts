import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: any; // You can replace with your Product type
  quantity: number;
  color: string;
  images: string[];
}

interface Cart {
  _id?: string;
  user?: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    addToCartSuccess: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
});

export const {
  setCartLoading,
  setCartError,
  setCart,
  addToCartSuccess,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
