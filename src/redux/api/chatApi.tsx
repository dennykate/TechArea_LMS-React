import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from "@/config";
import { EncryptStorage } from "@/utilities/encrypt-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    const encryptStorage = new EncryptStorage(config.secretKey);
    const token = encryptStorage.get("token");
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query<MsgData[], { conversationId: string, page: number }>({
      query: ({ conversationId, page }) => 
        `/messages?conversation_id=${conversationId}&limit=5&page=${page}`,
    }),
    getGroupChatMessages: builder.query<MsgData[], { groupId: string, page: number }>({
      query: ({ groupId, page }) => 
        `/group-chat-messages?group_chat_id=${groupId}&limit=5&page=${page}`,
    }),
  }),
});

export const { useGetMessagesQuery, useGetGroupChatMessagesQuery } = chatApi;
