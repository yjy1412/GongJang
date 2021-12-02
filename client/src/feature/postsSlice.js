import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetAllPosts = createAsyncThunk(
  'posts/fetchGetAllPosts',
  async () => {
    try {
      const response = await axios.get('/posts');
      return response.data;
    } catch(err){
      return err.response.data;
    }
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
      state.loading = false;
    },
    [fetchGetAllPosts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  }
})

export default postsSlice.reducer;
