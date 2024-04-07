/* eslint-disable react-hooks/rules-of-hooks */
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

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery,
  tagTypes: ["getData"],
  endpoints: (builder) => ({
    postData: builder.mutation<any, any>({
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

export const { usePostDataMutation } = formApi;
