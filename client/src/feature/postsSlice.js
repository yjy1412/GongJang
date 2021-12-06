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

const initialState = {
  posts: null,
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
  }
})

export const { changeWish } = postsSlice.actions;
export default postsSlice.reducer;
