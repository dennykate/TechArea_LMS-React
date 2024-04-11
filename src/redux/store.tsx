/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { formApi } from "./api/formApi";
import { queryApi } from "./api/queryApi";
import keySlice from "./services/keySlice";
import { chatApi } from "./api/chatApi";

export const store = configureStore({
  reducer: {
    key: keySlice,
    [formApi.reducerPath]: formApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      formApi.middleware,
      queryApi.middleware,
      chatApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
