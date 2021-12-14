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

export const fetchGetMyPosts = createAsyncThunk(
  'mypage/fetchGetMyPosts',
  async() => {
    const response = await axios.get('/auth/mypage/posts');
    return response.data;
  }
)

export const fetchGetPostsByCategory = createAsyncThunk(  
  'posts/fetchGetPostsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/posts?category=${category}`);
      return response.data;
    } catch(err){
      return rejectWithValue(err.response.data);
    }
  }
)

export const fetchGetPostsBySearch = createAsyncThunk(
  'posts/fetchGetPostsBySearch',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/posts?search=${keyword}`)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const initialState = {
  posts: [],
  myposts: [],
  error: null,
  loading: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changeWish: (state, { payload: id }) => {
      state.posts.map(post => {
        if(post.id === id){
          if(post.wish){
            post.wish = false;
          } else {
            post.wish = true;
          }
        }
        return post;
      })
    },
  },
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
    [fetchGetPostsByCategory.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetPostsByCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if(typeof payload !== 'string'){
        state.posts = payload
      }
    },
    [fetchGetPostsByCategory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [fetchGetPostsBySearch.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetPostsBySearch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if(typeof payload !== 'string'){
        state.posts = payload
      }
    },
    [fetchGetPostsBySearch.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [fetchGetMyPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchGetMyPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.myposts = payload;
    },
    [fetchGetMyPosts.rejected]: (state) => {
      state.loading = false;
    }
  }
})

export const { changeWish } = postsSlice.actions;
export default postsSlice.reducer;
