import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "../layout/MainPages/pages/Profile-page/profileSlice";
import filterSlice from "../layout/MainPages/pages/Catalog-page/Filters/filterSlice";
import CreateAdSlice from "../layout/MainPages/pages/СreateAD_info-page/CreateAdSlice";

export const store = configureStore({
  reducer: {
    // profile: profileReducer,
    input_form: CreateAdSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
