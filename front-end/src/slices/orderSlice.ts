import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types/order";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  loadedOnce: boolean; 
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  loadedOnce: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setOrdersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },

    setLoadedOnce: (state) => {
      state.loadedOnce = true;
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: Order["orderStatus"] }>
    ) => {
      const order = state.orders.find(o => o._id === action.payload.orderId);
      if (order) {
        order.orderStatus = action.payload.status;
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
      state.loadedOnce = false;
    },
  },
});

export const {
  setOrdersLoading,
  setOrdersError,
  setOrders,
  updateOrderStatus,
  clearOrders,
  setLoadedOnce,
} = orderSlice.actions;

export default orderSlice.reducer;
