import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface User {
  user_id: string;
}

interface ChatDataState {
  currentChatData: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
  users: User[];
}

const initialState: ChatDataState = {
  currentChatData: {},
  users: [],
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setCurrentChatData: (state, action: PayloadAction<unknown>) => {
      state.currentChatData = action.payload;
    },
    addGroupUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeGroupUser: (state, action: PayloadAction<string>) => {
      const index = state.users.findIndex(user => user.user_id === action.payload);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
    clearGroupUsers: (state) => {
      state.users = []; // Resets the users array to empty
    },
  },
});

export const { setCurrentChatData, addGroupUser, removeGroupUser, clearGroupUsers } =
  chatDataSlice.actions;

// Selector to access the current chat data
export const selectCurrentChatData = (state: RootState) =>
  state.chat.currentChatData;
// Selector to access the list of users
export const selectUsers = (state: RootState) => state.chat.users;

export default chatDataSlice.reducer;
