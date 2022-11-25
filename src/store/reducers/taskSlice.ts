import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from 'api/users';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';

interface ITasksState {
  assignees: { [taskId: string]: string };
  isPending: boolean;
  isTokenExpired: boolean;
}

const initialState: ITasksState = {
  assignees: {},
  isPending: false,
  isTokenExpired: false,
};

export const getTaskAssignee = createAsyncThunk(
  'task/getTaskAssignee',
  async (options: { userId: string; taskId: string }, { rejectWithValue }) => {
    try {
      const user = await getUser(options.userId);

      return { taskId: options.taskId, userName: user.name };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTaskTokenExpiration(state) {
      state.isTokenExpired = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskAssignee.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getTaskAssignee.fulfilled, (state, action) => {
      const { taskId, userName } = action.payload;
      state.assignees[taskId] = userName;
      state.isPending = false;
    });
    builder.addCase(getTaskAssignee.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});

export default taskSlice.reducer;
export const { resetTaskTokenExpiration } = taskSlice.actions;
