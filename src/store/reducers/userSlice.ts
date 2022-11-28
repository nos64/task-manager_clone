import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from 'api/auth';
import jwt_decode from 'jwt-decode';
import { AxiosError } from 'axios';
import { deleteUser, getUser, getUsers, updateUser } from 'api/users';
import IJWTDecode from 'types/IJWTDecode';
import updateStorage from 'utils/updateStorage';
import StatusCodes from 'common/statusCodes';
import { SignInPick, UserPick } from 'types/APIModel';
import Languages from 'types/Languages';
import IUser from 'types/IUser';
import { RootState } from 'store/store';
import { resetTaskTokenExpiration } from './taskSlice';
import { resetBoardTokenExpiration } from './boardSlice';
import { resetBoardsTokenExpiration } from './boardsSlice';
import { resetColumnTokenExpiration } from './columnSlice';
import Themes from 'types/Theme';

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (options: UserPick, { rejectWithValue, dispatch }) => {
    dispatch(resetTaskTokenExpiration());
    dispatch(resetBoardTokenExpiration());
    dispatch(resetBoardsTokenExpiration());
    dispatch(resetColumnTokenExpiration());

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
  async (options: SignInPick, { rejectWithValue, dispatch }) => {
    dispatch(resetTaskTokenExpiration());
    dispatch(resetBoardTokenExpiration());
    dispatch(resetBoardsTokenExpiration());
    dispatch(resetColumnTokenExpiration());

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

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    return await getUsers();
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.status);
    }

    throw error;
  }
});

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (options: UserPick, { rejectWithValue, getState }) => {
    const userId = (getState() as RootState).user.id;

    try {
      return await updateUser(userId, options);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'user/deleteUserAccount',
  async (_, { rejectWithValue, getState }) => {
    const userId = (getState() as RootState).user.id;

    try {
      return await deleteUser(userId);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

interface UserState {
  isAuthorised: boolean;
  isPending: boolean;
  id: string;
  login: string;
  name: string;
  language: Languages;
  theme: Themes;
  avatarID: number;
  users: Partial<IUser>[];
  isLoginAlreadyExist: boolean;
  isAuthorisationError: boolean;
  isTokenRequireUpdate: boolean;
  isRoutesProtected: boolean;
  isTokenExpired: boolean;
  isProfileUpdated: boolean;
  isProfileDeleted: boolean;
}

const initialState: UserState = {
  isAuthorised: false,
  isPending: false,
  id: '',
  login: '',
  name: '',
  language: 'EN',
  theme: 'dark',
  avatarID: 0,
  users: [],
  isLoginAlreadyExist: false,
  isAuthorisationError: false,
  isTokenRequireUpdate: false,
  isRoutesProtected: !!localStorage.getItem('token'),
  isTokenExpired: false,
  isProfileUpdated: false,
  isProfileDeleted: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthorised(state, action: PayloadAction<false>) {
      state.isAuthorised = action.payload;
      state.isRoutesProtected = action.payload;
      state.id = '';
      state.login = '';
      state.name = '';
      state.language = 'EN';
      state.theme = 'dark';
      state.avatarID = 0;
    },
    setLanguage(state, action: PayloadAction<Languages>) {
      state.language = action.payload;
    },
    setTheme(state, action: PayloadAction<Themes>) {
      state.theme = action.payload;
    },
    setIsRoutesProtected(state, action: PayloadAction<false>) {
      state.isRoutesProtected = action.payload;
    },
    setIsTokenRequireUpdate(state, action: PayloadAction<true>) {
      state.isTokenRequireUpdate = action.payload;
    },
    setAvatarId(state, action: PayloadAction<number>) {
      state.avatarID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.isPending = true;
      state.isAuthorisationError = false;
      state.isLoginAlreadyExist = false;
      state.isTokenRequireUpdate = false;
      state.isTokenExpired = false;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;
      state.isRoutesProtected = true;

      const userInfo = updateStorage(action.payload.userInfo._id, action.payload.userInfo);

      state.id = userInfo._id || state.id;
      state.login = userInfo.login || state.login;
      state.name = userInfo.name || state.name;
      state.language = userInfo.language || state.language;
      state.theme = userInfo.theme || state.theme;
      state.avatarID = userInfo.avatarID || state.avatarID;

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
      state.isTokenRequireUpdate = false;
      state.isTokenExpired = false;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;
      state.isRoutesProtected = true;

      const userInfo = updateStorage(action.payload._id, action.payload);

      state.id = userInfo._id || state.id;
      state.login = userInfo.login || state.login;
      state.name = userInfo.name || state.name;
      state.language = userInfo.language || state.language;
      state.theme = userInfo.theme || state.theme;
      state.avatarID = userInfo.avatarID || state.avatarID;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }

      if (action.payload === StatusCodes.AUTHORIZATION_ERROR) {
        state.isAuthorisationError = true;
      }
    });

    builder.addCase(getUserById.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isPending = false;
      state.isAuthorised = true;

      const userInfo = updateStorage(action.payload._id, action.payload);

      state.id = userInfo._id || state.id;
      state.login = userInfo.login || state.login;
      state.name = userInfo.name || state.name;
      state.language = userInfo.language || state.language;
      state.theme = userInfo.theme || state.theme;
      state.avatarID = userInfo.avatarID || state.avatarID;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(getAllUsers.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isPending = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(updateUserInfo.pending, (state) => {
      state.isPending = true;
      state.isProfileUpdated = false;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isPending = false;
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.id = action.payload._id;
      state.isProfileUpdated = true;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(deleteUserAccount.pending, (state) => {
      state.isPending = true;
      state.isProfileDeleted = false;
    });
    builder.addCase(deleteUserAccount.fulfilled, (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem(state.id);

      state.isPending = false;
      state.isAuthorised = false;
      state.isRoutesProtected = false;
      state.id = '';
      state.login = '';
      state.name = '';
      state.language = 'EN';
      state.theme = 'dark';
      state.avatarID = 0;
      state.isProfileDeleted = true;
    });
    builder.addCase(deleteUserAccount.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});

export const {
  setTheme,
  setIsAuthorised,
  setLanguage,
  setIsRoutesProtected,
  setIsTokenRequireUpdate,
  setAvatarId,
} = userSlice.actions;
export default userSlice.reducer;
