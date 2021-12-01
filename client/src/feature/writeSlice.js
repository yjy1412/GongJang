import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWritePost = createAsyncThunk(
  'write/fetchWritePost',
  async (formData, { rejectWithValue }) => {
    const { title, content, category, soldOut, image } = formData;
    try {
      const response = await axios.post('/posts', { title, content, category, soldOut, image });
      return response.data;  
    } catch(err){
      return rejectWithValue(err.response.data);
    }
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
  images: [],
  category: '',
  soldOut: false,
  post: null,
  postError: null,
  originalPostId: null,
  loading: false,
}

export const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    initialize: () => {
      return initialState;
    },
    changeField: (state, { payload: { key, value }}) => {
      state[key] = value;
    },
    setOriginalPost: (state, { payload: post }) => {
      state.title = post.title;
      state.content = post.body;
      state.images = post.images;
      state.category = post.category;
      state.soldOut = post.soldOut;
      state.originalPostId = post.post_id;
    },
    changeCategory: (state, { payload }) => {
      state.category = payload;
    },
    changeState: (state, { payload }) => {
      state.soldOut = payload;
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
      state.post = state.originalPostId;
      state.loading = false;
    },
    [fetchUpdatePost.rejected]: (state, { payload }) => {
      state.postError = payload;
      state.loading = false;
    },
  }
})

export const { initialize, changeField, setOriginalPost, changeCategory, changeState } = writeSlice.actions;
export default writeSlice.reducer;