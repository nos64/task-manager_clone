import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTasksInColumn } from 'api/tasks';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import ITask from 'types/ITask';

interface IColumnsState {
  tasks: { [columnId: string]: ITask[] };
  isPending: boolean;
  isTokenExpired: boolean;
}

const initialState: IColumnsState = {
  tasks: {},
  isPending: false,
  isTokenExpired: false,
};

export const getTasks = createAsyncThunk(
  'column/getTasks',
  async (options: { boardId: string; columnId: string }, { rejectWithValue }) => {
    try {
      const tasks = await getTasksInColumn(options.boardId, options.columnId);

      return { columnId: options.columnId, tasks };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      const { columnId, tasks } = action.payload;
      state.tasks[columnId] = tasks.sort((task1, task2) => (task1.order < task2.order ? -1 : 1));
      state.isPending = false;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});

export default columnSlice.reducer;
