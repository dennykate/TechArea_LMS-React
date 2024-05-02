/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "@/config";
import { EncryptStorage } from "@/utilities/encrypt-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl, // Your API base URL
  prepareHeaders: (headers) => {
    const encryptStorage = new EncryptStorage(config.secretKey);

    const token = encryptStorage.get("token") || "";

    headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  endpoints: (builder) => ({
    postGetData: builder.query<any, string>({
      query: (url: string) => url,
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { usePostGetDataQuery } = postApi;
