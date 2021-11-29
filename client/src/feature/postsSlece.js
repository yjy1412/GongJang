import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetAllPosts = createAsyncThunk(
  'posts/fetchGetAllPosts',
  async () => {
    const response = await axios.get('http://localhost:4000/posts');
    return response.data;
  }
)

const initialState = {
  posts: null,
  error: null,
  loading: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetAllPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
      state.loading = true;
    },
    [fetchGetAllPosts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = true;
    },
  }
})

export default postsSlice.reducer;
