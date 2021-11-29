import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetPostDetail = createAsyncThunk(
  'post/fetchGetPost',
  async (id) => {
    const response = await axios.get(`http://localhost:4000/posts/${id}`);
    return response.data;
  }
)

export const fetchRemovePost = createAsyncThunk(
  'write/fetchRemovePost',
  async (id) => {
    await axios.delete(`http://localhost:4000/posts/${id}`);
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
    unloadPost: (state) => {
      state.post = null;
      state.postError = null;
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

export const { unloadPost } = postSlice.actions;
export default postSlice.reducer;
