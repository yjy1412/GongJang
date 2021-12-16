import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetPostDetail = createAsyncThunk(
  'post/fetchGetPost',
  async (post_id) => {
    const response = await axios.get(`/posts/${post_id}`);
    return response.data;
  }
)

export const fetchRemovePost = createAsyncThunk(
  'post/fetchRemovePost',
  async (post_id) => {
    await axios.delete(`/posts/${post_id}`);
  }
)

const initialState = {
  post: null,
  error: null,
  loading: false,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    unloadPost: () => {
      return initialState;
    },
    changeWishPost: (state, { payload: wish }) => {
      state.post.wish = !wish;
    }
  },
  extraReducers: {
    [fetchGetPostDetail.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetPostDetail.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    [fetchGetPostDetail.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [fetchRemovePost.fulfilled]: (state) => {
      state.loading = false;
    },
  }
})

export const { unloadPost, changeWishPost } = postSlice.actions;
export default postSlice.reducer;
