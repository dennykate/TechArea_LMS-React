/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface PostData {
  image: string;
  created_by: string;
  content: string;
  comment_count: number;
  reaction_count: number;
  created_at: string;
  id: string;
}

interface PostState {
  data?: PostData;
}

// Define the initial state using that type
const initialState: PostState = {
  data: undefined,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Use PayloadAction to enforce type checking on the payload
    editPost: (state, action: PayloadAction<PostData>) => {
      state.data = action.payload;
    },
  },
});

export const { editPost } = postSlice.actions;

// Correct the selector to refer to the 'post' slice and properly type the returned value
export const selectPost = (state: RootState): PostData | undefined => state.postSlice.data;

export default postSlice.reducer;
