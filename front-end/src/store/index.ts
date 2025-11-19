import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import productReducer from "../slices/productSlice";
import sellerProductReducer from "../slices/sellerProductSlice";
import cartReducer from "../slices/cartSlice";
import addressReducer from "../slices/addressSlice";
import orderReducer from "../slices/orderSlice";
import bannerReducer from "../slices/bannerSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configs
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const addressPersistConfig = {
  key: "address",
  storage,
  whitelist: ["addresses", "selectedAddress"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedAddressReducer = persistReducer(addressPersistConfig, addressReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userReducer,
    products: productReducer,
    sellerProducts: sellerProductReducer,
    cart: persistedCartReducer,
    address: persistedAddressReducer,
    orders: orderReducer,   // NOT persisted
    banners: bannerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
