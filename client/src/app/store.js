import { configureStore, combineReducers } from '@reduxjs/toolkit';
import postSlice from '../feature/postSlice';
import postsSlice from '../feature/postsSlice';
import userSlice from '../feature/userSlice';
import wishSlice from '../feature/wishSlice';
import writeSlice from '../feature/writeSlice';
import commentSlice from '../feature/commentSlice';

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Reducer-Persist
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userSlice,
  write: writeSlice,
  post: postSlice,
  posts: postsSlice,
  wish: wishSlice,
  comment: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
});

export const persistor = persistStore(store);