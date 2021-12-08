import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetAllComments = createAsyncThunk(
  'comment/fetchGetAllComments',
  async (post_id) => {
    const response = await axios.get(`/comments/${post_id}`);
    return response.data;
  }
)

export const fetchCreateComment = createAsyncThunk(
  'comment/fetchCreateComment',
  async () => {
    const response = await axios.post('/comments');
    return response.data;
  }
)

export const fetchUpdateComment = createAsyncThunk(
  'comment/fetchUpdateComment',
  async (comments_id) => {
    const response = await axios.patch(`/comments/${comments_id}`);
    return response.data;
  }
)

export const fetchRemoveComment = createAsyncThunk(
  'comment/fetchRemoveComment',
  async (comments_id) => {
    const response = await axios.delete(`/comments/${comments_id}`);
    return response.data;
  }
)

const initialState = {
  commentList:[],
  loading: false,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllComments.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetAllComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
    [fetchCreateComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
    [fetchUpdateComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
    [fetchRemoveComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.commentList = payload;
    },
  }
})

export default commentSlice.reducer;