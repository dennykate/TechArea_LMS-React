/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ChatDataState {
  currentChatData: any;
}

const initialState: ChatDataState = {
  currentChatData: {},
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setCurrentChatData: (state, action) => {
      state.currentChatData = action.payload;
    },
  },
});

export const { setCurrentChatData } = chatDataSlice.actions;

// Selector to access the currentChatData from the state
export const selectCurrentChatData = (state: RootState) =>
  state.chat.currentChatData;

export default chatDataSlice.reducer;
