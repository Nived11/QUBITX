import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BannerState {
  banners: any[];
  loaded: boolean;
}

const initialState: BannerState = {
  banners: [],
  loaded: false,
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<any[]>) => {
      state.banners = action.payload;
      state.loaded = true;
    },
  },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
