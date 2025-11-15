import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Address } from "@/types/address";

interface AddressState {
  addresses: Address[];
  selectedAddress: Address | null;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddress: null,
  loading: false,
  actionLoading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setActionLoading: (state, action: PayloadAction<boolean>) => {
      state.actionLoading = action.payload;
    },
    setAddressError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
      state.loading = false;
      state.error = null;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.unshift(action.payload);
      state.actionLoading = false;
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(
        (addr) => addr._id === action.payload._id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
      state.actionLoading = false;
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (addr) => addr._id !== action.payload
      );
      if (state.selectedAddress?._id === action.payload) {
        state.selectedAddress = null;
      }
      state.actionLoading = false;
    },
    setSelectedAddress: (state, action: PayloadAction<Address | null>) => {
      state.selectedAddress = action.payload;
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === action.payload,
      }));
      state.actionLoading = false;
    },
    clearAddresses: (state) => {
      state.addresses = [];
      state.selectedAddress = null;
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
    },
  },
});

export const {
  setAddressLoading,
  setActionLoading,
  setAddressError,
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setSelectedAddress,
  setDefaultAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
