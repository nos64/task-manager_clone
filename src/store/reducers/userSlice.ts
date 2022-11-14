import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from 'api/auth';
import jwt_decode from 'jwt-decode';
import { AxiosError } from 'axios';
import { getUser } from 'api/users';
import IJWTDecode from 'types/IJWTDecode';
import updateStorage from 'utils/updateStorage';
import StatusCodes from 'common/statusCodes';
import { SignInPick, UserPick } from 'types/APIModel';

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (options: UserPick, { rejectWithValue }) => {
    try {
      const userInfo = await signUp(options);
      const token = await signIn({ login: options.login, password: options.password });

      return {
        userInfo: { ...userInfo },
        token: { ...token },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async (options: SignInPick, { rejectWithValue }) => {
    try {
      const response = await signIn(options);
      const tokenInfo: IJWTDecode = jwt_decode(response.token || '');

      localStorage.setItem('token', response.token || '');

      const userInfo = await getUser(tokenInfo.id);

      return userInfo;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const getUserById = createAsyncThunk('user/getUserById', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const tokenInfo: IJWTDecode = jwt_decode(token || '');

    const user = await getUser(tokenInfo.id);

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.status);
    }

    throw error;
  }
});

interface UserState {
  isAuthorised: boolean;
  isPending: boolean;
  login: string;
  name: string;
  language: string;
  theme: string;
  isLoginAlreadyExist: boolean;
  isAuthorisationError: boolean;
  isTokenExpired: boolean;
}

const initialState: UserState = {
  isAuthorised: false,
  isPending: false,
  login: '',
  name: '',
  language: 'EN',
  theme: 'dark',
  isLoginAlreadyExist: false,
  isAuthorisationError: false,
  isTokenExpired: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthorised(state, action: PayloadAction<false>) {
      state.isAuthorised = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.isPending = true;
      state.isLoginAlreadyExist = false;
      state.isAuthorisationError = false;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;

      const userInfo = updateStorage(action.payload.userInfo._id, action.payload.userInfo);

      state.login = userInfo.login || state.login;
      state.name = userInfo.name || state.name;
      state.language = userInfo.language || state.language;
      state.theme = userInfo.theme || state.theme;

      localStorage.setItem('token', action.payload.token.token || '');
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.CONFLICT) {
        state.isLoginAlreadyExist = true;
      }
    });

    builder.addCase(signInUser.pending, (state) => {
      state.isPending = true;
      state.isAuthorisationError = false;
      state.isLoginAlreadyExist = false;
      state.isTokenExpired = false;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;

      const userInfo = updateStorage(action.payload._id, action.payload);

      state.login = userInfo.login || state.login;
      state.name = userInfo.name || state.name;
      state.language = userInfo.language || state.language;
      state.theme = userInfo.theme || state.theme;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
        state.isAuthorised = false;
      }

      if (action.payload === StatusCodes.AUTHORIZATION_ERROR) {
        state.isAuthorisationError = true;
      }
    });

    builder.addCase(getUserById.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getUserById.fulfilled, (state) => {
      state.isPending = false;
      state.isAuthorised = true;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isAuthorised = false;
        state.isTokenExpired = true;
      }
    });
  },
});

export const { setIsAuthorised } = userSlice.actions;
export default userSlice.reducer;
