/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { formApi } from "./api/formApi";
import { queryApi } from "./api/queryApi";
import keySlice from "./services/keySlice";
import chatSlice from "./services/chatSlice";
import postSlice from "./services/postSlice";

export const store = configureStore({
  reducer: {
    postSlice: postSlice,
    chat: chatSlice,
    key: keySlice,
    [formApi.reducerPath]: formApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(formApi.middleware, queryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
