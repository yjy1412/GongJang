import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSignUp = createAsyncThunk(
  'signUp/fetchSignUp',
  async (form, { rejectWithValue }) => {
    const { nickname, email, password } = form;
    try {
      const response = await axios.post('http://localhost:4000/auth/sign-up', { nickname, email, password });
      return response.data;
    } catch(err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (form, { rejectWithValue }) => {
    const { email, password } = form;
    try {
      const response = await axios.post('http://localhost:4000/auth/log-in', { email, password });
      return response.data;
    } catch(err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdatePassword = createAsyncThunk(
  'password/fetchUpdatePassword',
  async (form, { rejectWithValue }) => {
    const { currentPassword, newPassword } = form;
    try {
      const response = await axios.patch('http://localhost:4000/auth/password', { current: currentPassword, new: newPassword });
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  userError: null,
  isSignUp: false,
  isLogin: false,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.loading = true;
    },
    [fetchLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isLogin = true;
    },
    [fetchLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userError = payload;
    },
    [fetchSignUp.pending]: (state) => {
      state.loading = true;
    },
    [fetchSignUp.fulfilled]: (state) => {
      state.loading = false;
      state.isSignUp = true;
    },
    [fetchSignUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userError = payload;
    },
    [fetchUpdatePassword.pending]: (state) => {
      state.loading = true;
    },
    [fetchUpdatePassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [fetchUpdatePassword.rejected]: (state, { payload }) => {
      state.loading =false;
      state.userError = payload;
    }
  }
})

export default userSlice.reducer;
