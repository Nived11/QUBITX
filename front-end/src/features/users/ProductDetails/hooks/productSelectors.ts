import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export const selectAllProducts = createSelector(
  (state: RootState) => state.products.productCache,
  (productCache) => Object.values(productCache)
);
