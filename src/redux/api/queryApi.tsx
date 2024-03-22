/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EncryptStorage } from "use-encrypt-storage";

import config from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl, // Your API base URL
  prepareHeaders: (headers) => {
    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET_KEY);

    const token = encryptStorage.get("token") || "";

    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery,
  tagTypes: ["Data"],
  endpoints: (builder) => ({
    getData: builder.query<any, string>({
      query: (url: string) => url,
      keepUnusedDataFor: 3600,
      providesTags: ["Data"],
    }),
    postData: builder.mutation<any, any>({
      query: ({ url, body, method }) => {
        return {
          url,
          method,
          body,
        };
      },
      invalidatesTags: ["Data"],
    }),
  }),
});

export const { useGetDataQuery, usePostDataMutation } = queryApi;
