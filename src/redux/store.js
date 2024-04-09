import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api.generated.ts";

/* eslint-disable-next-line import/prefer-default-export */
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
