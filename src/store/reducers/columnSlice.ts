import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteTask, getTasksInColumn } from 'api/tasks';
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
  async (data: { boardId: string; columnId: string }, { rejectWithValue }) => {
    try {
      const tasks = await getTasksInColumn(data.boardId, data.columnId);

      return { columnId: data.columnId, tasks };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const deleteColumnTask = createAsyncThunk(
  'column/deleteTask',
  async (task: ITask, { rejectWithValue }) => {
    try {
      const deletedTask = await deleteTask(task.boardId, task.columnId, task._id);

      return deletedTask;
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

    builder.addCase(deleteColumnTask.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteColumnTask.fulfilled, (state, action) => {
      const deletedTask = action.payload;
      console.log('task', deletedTask);
      const columnsEntry = Object.entries(state.tasks).find(
        (entry) => entry[0] === deletedTask.columnId
      );
      console.log('columnsEntry', columnsEntry);
      const tasks = columnsEntry ? columnsEntry[1] : null;
      console.log('tasks', tasks);
      const newTasks = tasks?.filter((task) => task._id !== deletedTask._id);
      console.log('newTasks', newTasks);
      state.tasks[deletedTask.columnId] = newTasks || [];

      state.isPending = false;
    });
    builder.addCase(deleteColumnTask.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});

export default columnSlice.reducer;
