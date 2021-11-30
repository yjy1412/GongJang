import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../feature/userSlice';
import writeSlice from '../feature/writeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    write: writeSlice,
  },
});
