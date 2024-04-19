// Define interfaces for better type safety
interface Post {
  id: string;
  content: string;
  image: string;
  created_by: string;
  comment_count: number;
  reaction_count: number;
  created_at: string;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
}

interface FetchPostsResponse {
  data: Post[];
  meta: PaginationMeta;
}

interface PostsState {
  posts: Post[];
  page: number;
  hasMore: boolean;
}

interface FetchPostsArgs {
  limit: number;
  page: number;
}

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Asynchronous thunk for fetching posts from the API
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ limit, page }: FetchPostsArgs): Promise<FetchPostsResponse> => {
    const response = await fetch(`https://api.jccmyanmar.com/api/v1/posts?limit=${limit}&page=${page}`);
    const data = await response.json();
    return data as FetchPostsResponse;
  }
);

// Initial state for the posts slice
const initialState: PostsState = {
  posts: [],
  page: 1,
  hasMore: true,
};

// Create a slice for posts with Redux Toolkit
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<FetchPostsResponse>) => {
      const { data, meta } = action.payload;
      if (data.length === 0 || meta.current_page === meta.last_page) {
        state.hasMore = false;  // No more data to load
      } else {
        state.posts = [...state.posts, ...data];  // Append new posts to the existing array
        state.page = meta.current_page + 1;  // Prepare for the next page fetch
      }
    });
  },
});

export default postsSlice.reducer;
