import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksSet } from 'api/tasks';
import { getUser } from 'api/users';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import ITask from 'types/ITask';

interface ITasksState {
  assignees: { [taskId: string]: string };
  isPending: boolean;
  isTokenExpired: boolean;
  tasksList: ITask[];
}

const initialState: ITasksState = {
  assignees: {},
  isPending: false,
  isTokenExpired: false,
  tasksList: [],
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

export const getTasksBySearchQuery = createAsyncThunk(
  'task/getTaskBysearchquery',
  async (options: { userId: string; query: string }, { rejectWithValue }) => {
    try {
      return await getTasksSet([], options.userId, options.query);
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
    setTasksList(state, action: PayloadAction<ITask[]>) {
      state.tasksList = action.payload;
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

    builder.addCase(getTasksBySearchQuery.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getTasksBySearchQuery.fulfilled, (state, action) => {
      state.isPending = false;
      state.tasksList = action.payload;
    });
    builder.addCase(getTasksBySearchQuery.rejected, (state) => {
      state.isPending = false;
    });
  },
});

export default taskSlice.reducer;
export const { resetTaskTokenExpiration, setTasksList } = taskSlice.actions;
