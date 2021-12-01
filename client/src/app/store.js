import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../feature/postSlice';
import userSlice from '../feature/userSlice';
import writeSlice from '../feature/writeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    write: writeSlice,
    post: postSlice,
  },
});
