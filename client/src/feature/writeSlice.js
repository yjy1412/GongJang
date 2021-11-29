import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWritePost = createAsyncThunk(
  'write/fetchWritePost',
  async (form) => {
    const {} = form;
    const response = await axios.post('http://localhost:4000/posts', {});
    return response.data;
  }
)

export const fetchUpdatePost = createAsyncThunk(
  'write/fetchUpdatePost',
  async (form) => {
    const { id, } = form;
    const response = await axios.patch(`http://localhost:4000/posts/${id}`, {});
    return response.data;
  }
)

const initialState = {
  title: '',
  content: '',
  image: [],
  category: '',
  post: null,
  postError: null,
  originalPostId: null,
  loading: false,
}

export const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    initialize: (state) => {
      state.post = null;
      state.postError = null;
    },
    changeField: (state, { payload: { key, value }}) => {
      state[key] = value;
    },
    setOriginalPost: (state, { payload: post }) => {
      state.title = post.title;
      state.content = post.body;
      state.image = post.image;
      state.category = post.category;
      state.originalPostId = post.post_id;
    }
  },
  extraReducers: {
    [fetchWritePost.pending]: (state) => {
      state.loading = true;
    },
    [fetchWritePost.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    [fetchWritePost.rejected]: (state, { payload }) => {
      state.postError = payload;
      state.loading = false;
    },
    [fetchUpdatePost.pending]: (state) => {
      state.loading = true;
    },
    [fetchUpdatePost.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    [fetchUpdatePost.rejected]: (state, { payload }) => {
      state.postError = payload;
      state.loading = false;
    },
  }
})

export const { initialize, changeField, setOriginalPost } = writeSlice.actions;
export default writeSlice.reducer;