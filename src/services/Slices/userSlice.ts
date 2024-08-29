import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi } from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import {
  updateUserApi,
  getUserApi,
  logoutApi,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loginUserError: string | null;
};

const initialState: UserState = {
  user: {
    email: '',
    name: ''
  },
  isAuthChecked: false,
  loginUserError: null
};

export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const getUser = createAsyncThunk('user/getuser', getUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password }).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  ({ email, password }: Omit<TRegisterData, 'name'>) =>
    loginUserApi({ email, password }).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserError = action.error.message!;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserError = null;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserError = action.error.message!;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserError = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserError = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserError = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loginUserError = action.error.message!;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
    });
  },
  selectors: {
    isAuthCheckedUser: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getName: (state) => (state.user ? state.user.name : null),
    getError: (state) => state.loginUserError
  }
});

export const authReducer = userSlice.reducer;
export const { isAuthCheckedUser, getName, getError } = userSlice.selectors;
export const selectUser = (state: { user: UserState }) => state.user.user;
