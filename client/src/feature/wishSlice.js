import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishList = createAsyncThunk(
  'wish/fetchWishList',
  async () => {
    const response = await axios.get('http://localhost:4000/wish');
    return response.data;
  }
)

export const fetchWish = createAsyncThunk(
  'wish/fetchWish',
  async (id) => {
    await axios.post(`http://localhost:4000/wish/${id}`);
  }
)

export const fetchRemoveWish = createAsyncThunk(
  'wish/fetchRemoveWish',
  async (id) => {
    await axios.delete(`http://localhost:4000/wish/${id}`);
  }
)

const initialState = {
  wish: false,
  wishList: null,
  error: null,
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
      state.error = payload;
      state.loading = false;
    },
    [fetchWish.fulfilled]: (state) => {
      // state.wish = true;
    },
    [fetchRemoveWish.fulfilled]: (state) => {
      // state.wish = false;
    }
  }
})

export const { addWish, removeWish } = wishSlice.actions;
export default wishSlice.reducer;