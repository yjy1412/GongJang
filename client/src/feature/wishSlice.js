import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishList = createAsyncThunk(
  'wish/fetchWishList',
  async () => {
    const response = await axios.get('/wish');
    return response.data;
  }
)

export const fetchWish = createAsyncThunk(
  'wish/fetchWish',
  async (post_id) => {
    const response = await axios.post('/wish', { post_id });
    return response.data;
  }
)

export const fetchRemoveWish = createAsyncThunk(
  'wish/fetchWish',
  async (post_id) => {
    const response = await axios.delete('/wish', {data: { post_id }});
    return response.data;
  }
)

const initialState = {
  wish: false,
  wishList: null,
  wishError: null,
  loading: false,
}

export const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    addWish: (state, { payload }) => {
      const wishIndex = state.wishList.findIndex(
        (item) => item.id === payload.id
      );
      state.wishList[wishIndex].post.wish = true;
    },
    removeWish: (state, { payload }) => {
      const newWishList = state.wishList.filter(
        (item) => item.id !== payload.id
      );
      state.wishList = newWishList;
    }
  },
  extraReducers: {
    [fetchWishList.pending]: (state) => {
      state.loading = true;
    },
    [fetchWishList.fulfilled]: (state, { payload }) => {
      state.wishList = payload;
      state.loading = false;
    },
    [fetchWishList.rejected]: (state, { payload }) => {
      state.wishError = payload;
      state.loading = false;
    },
    [fetchWish.fulfilled]: (state) => {
      state.loading = false;
    },
    [fetchWish.rejected]: (state, { payload }) => {
      state.wishError = payload;
    },
    [fetchRemoveWish.fulfilled]: (state) => {
    },
  }
})

export const { addWish, removeWish } = wishSlice.actions;
export default wishSlice.reducer;