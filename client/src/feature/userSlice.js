import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const fetchSignUp = createAsyncThunk(
  'signUp/fetchSignUp',
  async (form, { rejectWithValue }) => {
    const { nickname, email, password } = form;
    try {
      const response = await axios.post('/auth/sign-up', { nickname, email, password });
      return response.data;
    } catch(err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchMypage = createAsyncThunk(
  'mypage/fetch',
  async() => {
    const response = await axios.get('/auth/mypage');
    return response.data;
  }
)

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (form, { rejectWithValue }) => {
    const { email, password } = form;
    try {
      const response = await axios.post('/auth/log-in', { email, password });
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
      const response = await axios.patch('/auth/password', { current: currentPassword, new: newPassword });
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLogOut = createAsyncThunk(
  'logOut/fetchLogOut',
  async () => {
      const response = await axios.post(
        '/auth/log-out'
      );
      return response.data;
  }
);

export const fetchUpdateUserInfo = createAsyncThunk(
  'mypage/fetchUpdateUserInfo',
  async ( newNickname, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        '/auth/mypage', 
        { nickname: newNickname },
      )
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateProfileImage = createAsyncThunk(
  'mypage/fetchUpdateProfileImage',
  async ( newProfileImage, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        '/auth/mypage',
        { profile_image: newProfileImage },
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const fetchDeleteAccount = createAsyncThunk(
  'mypage/fetchDeleteAccount',
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/auth/sign-out');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const initialState = {
  accessToken: "",
  user: null,
  isSignUp: false,
  isLogin: false,
  userUpdated: false,
  passwordUpdated: false,
  loading: false,
  isEdited: false,
  loginError: null,
  signUpError: null,
  userInfoError: null,
  passwordError: null

}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeNickname: (state, { payload: value }) => {
      state.user.nickname = value; // 수정된 닉네임 user에 저장 
    },
  },
  extraReducers: {
    hydrate:(state, { payload }) => {
      return payload;
    },
    [fetchLogin.pending]: (state) => {
      state.loading = true;
    },
    [fetchLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.accessToken = payload.accessToken;
      state.user = payload.userInfo;
      state.isLogin = true;
    },
    [fetchLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.loginError = payload;
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
      state.signUpError = payload;
    },
    [fetchUpdatePassword.pending]: (state) => {
      state.loading = true;
    },
    [fetchUpdatePassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [fetchUpdatePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.passwordError = payload;
    },
    [fetchLogOut.pending]: (state) => {
      state.loading = true;
      state.accessToken = "";
    },
    [fetchLogOut.fulfilled]: (state) => {
      state.loading = false;
      state.isLogin = false;
      state.user = null;
    },
    [fetchUpdateUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [fetchUpdateUserInfo.fulfilled]: (state) => {
      state.loading = false;
      state.isEdited = true;
    },
    [fetchUpdateUserInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userInfoError = payload;
    },
    [fetchUpdateProfileImage.pending]: (state) => {
      state.loading = true;
    },
    [fetchUpdateProfileImage.fulfilled]: (state) => {
      state.loading = false;
      state.isEdited = true;
    },
    [fetchUpdateProfileImage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userInfoError = payload;
    },
    [fetchMypage.pending]: (state) => {
      state.loading = true;
    },
    [fetchMypage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.userInfo;
    },
    [fetchMypage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userError = payload;
    },
    [fetchDeleteAccount.pending]: (state) => {
      state.loading = true;
    },
    [fetchDeleteAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [fetchDeleteAccount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userError = payload;
    },
  }
})
export const { changeNickname } = userSlice.actions
export default userSlice.reducer;