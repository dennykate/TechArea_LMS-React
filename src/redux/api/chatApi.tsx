/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { EncryptStorage } from "use-encrypt-storage";
// import Cookies from "js-cookie";

import config from "@/config";
import { EncryptStorage } from "use-encrypt-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl, // Your API base URL
  prepareHeaders: (headers) => {
    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET_KEY);

    const token =
      encryptStorage.get("token") ||
      "21|PlRC16SqMqr2DsMFezRn6jqtAxmUgFnbIcUuZ1lK14484fd7";
    console.log(token);

    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery,
  tagTypes: ["getData"],
  endpoints: (builder) => ({
    getData: builder.query<any, any>({
      query: ({ url, body, method }) => {
        return {
          url,
          method,
          body,
        };
      },
      providesTags: [{ type: "getData", id: "all" }],
    }),
    getChatData: builder.query<any, any>({
      query: ({ url, body, method }) => {
        return {
          url,
          method,
          body,
        };
      },
      providesTags: [{ type: "getData", id: "all" }],
    }),
    sendMessage: builder.mutation<any, any>({
      query: ({ url, body, method }) => {
        return {
          url,
          method,
          body,
        };
      },
      invalidatesTags: [{ type: "getData", id: "all" }],
    }),
  }),
});

export const { useSendMessageMutation, useGetDataQuery, useGetChatDataQuery } =
  chatApi;
