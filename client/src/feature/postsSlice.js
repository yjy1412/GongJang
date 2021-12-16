import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from "qs";
axios.default.paramsSerializer = params => {
  return qs.stringify(params);
}

export const fetchGetAllPosts = createAsyncThunk(
  'posts/fetchGetAllPosts',
  async ( form ) => {
      try {
        if(form.category === '전체') {
          form = null;
        }
        const params = form;
        const response = await axios.get('/posts', 
          { 
            params        
          }
        );
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

const initialState = {
  posts: [],
  myposts: [],
  error: null,
  loading: false,
  noresult: false
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
      state.loading = false;
      if(typeof payload !== 'string'){
        state.noresult = false;
        state.posts = payload;
      } else {
        state.noresult = true;
      }
    },
    [fetchGetAllPosts.rejected]: (state, { payload }) => {
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
