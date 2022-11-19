import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './reducers/boardsSlice';
import userSlice from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    boards: boardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
