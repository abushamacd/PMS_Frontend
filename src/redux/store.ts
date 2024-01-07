import { baseApi } from "./api/baseApi";
import { reducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store: any = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
