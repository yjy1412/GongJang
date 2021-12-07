import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetPostDetail = createAsyncThunk(
  'post/fetchGetPost',
  async (id) => {
    const response = await axios.get(`/posts/${id}`);
    return response.data.data;
  }
)

export const fetchRemovePost = createAsyncThunk(
  'post/fetchRemovePost',
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
)

const initialState = {
  post: null,
  error: null,
  loading: false,
  images: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    unloadPost: () => {
      return initialState;
    },
  },
  extraReducers: {
    [fetchGetPostDetail.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetPostDetail.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.images = [payload.image1.data, payload.image2.data, payload.image3.data];
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

export const { unloadPost } = postSlice.actions;
export default postSlice.reducer;
