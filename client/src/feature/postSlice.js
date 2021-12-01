import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetPostDetail = createAsyncThunk(
  'post/fetchGetPost',
  async (id) => {
    const response = await axios.get(`http://localhost:4000/posts/${id}`,
      {
        headers: {
          "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvbmdAbmF2ZXIuY29tIiwiaWF0IjoxNjM4MjY0OTk3LCJleHAiOjE2MzgzNTEzOTd9.StObLI8C1LVikuxllBMFmlLV56VEt9wThX-QBUTp1GM"
        }
      }
    );
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
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    unloadPost: () => {
      return initialState;
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
