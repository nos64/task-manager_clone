import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksInColumn } from 'api/tasks';
import { AxiosError } from 'axios';
import IColumn from 'types/IColumn';
import ITask from 'types/ITask';

interface IColumnsState {
  [boardId: string]: ITask[];
}

const initialState: IColumnsState = {};

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
  reducers: {
    setTasks(state, action: PayloadAction<IColumnsState>) {
      const columnId = Object.keys(action.payload)[0];
      state[columnId] = action.payload[columnId];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      const { columnId, tasks } = action.payload;
      state[columnId] = tasks.sort((task1, task2) => (task1.order < task2.order ? -1 : 1));
    });
  },
});

export const { setTasks } = columnSlice.actions;
export default columnSlice.reducer;
