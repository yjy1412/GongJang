import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../feature/postSlice';
import postsSlice from '../feature/postsSlice';
import userSlice from '../feature/userSlice';
import wishSlice from '../feature/wishSlice';
import writeSlice from '../feature/writeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    write: writeSlice,
    post: postSlice,
    posts: postsSlice,
    wish: wishSlice,
  },
});
