import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authAPI";
import authReducer from "./authSlice";
import { jsonApi } from "./services/placeholderAPI";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jsonApi.reducerPath]: jsonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      jsonApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
