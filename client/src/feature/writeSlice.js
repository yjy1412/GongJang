import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWritePost = createAsyncThunk(
  'write/fetchWritePost',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }
      const response = await axios.post('/posts', formData, config);
      return response.data;  
    } catch(err){
      return rejectWithValue(err.response.data);
    }
  }
)

export const fetchUpdatePost = createAsyncThunk(
  'write/fetchUpdatePost',
  async (form, { rejectWithValue }) => {
    const { id, formData } = form;
    try {
      const config = {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }
      const response = await axios.patch(`/posts/${id}`, formData, config);
      return response.data;  
    } catch(err){
      return rejectWithValue(err.response.data);
    }
  }
)

const initialState = {
  title: '',
  content: '',
  category: '',
  images: [],
  soldOut: false,
  originalPostId: null,
  post: null,
  postError: null,
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
      state.content = post.content;
      state.images = [post.image1.data, post.image2.data, post.image];
      state.category = post.category;
      state.soldOut = post.soldOut;
      state.originalPostId = post.post_id;
    },
    changeCategory: (state, { payload }) => {
      state.category = payload;
    },
    changeState: (state, { payload }) => {
      state.soldOut = payload;
    },
    removeImage: (state, { payload: id }) => {
      const newImages = state.images.filter((image, index) => index !== id);
      state.images = newImages;
    },
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

export const { 
  initialize, 
  changeField, 
  setOriginalPost, 
  changeCategory, 
  changeState, 
  removeImage,
} = writeSlice.actions;
export default writeSlice.reducer;