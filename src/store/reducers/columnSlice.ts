import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, getTasksInColumn, updateTask, updateTasksSet } from 'api/tasks';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { RootState } from 'store/store';
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
  'column/deleteColumnTask',
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

export const createColumnTask = createAsyncThunk(
  'column/createColumnTask',
  async (task: Omit<ITask, '_id' | 'order'>, { rejectWithValue, getState }) => {
    const tasksCount = (getState() as RootState).column.tasks[task.columnId].length;
    const maxTaskOrder = (getState() as RootState).column.tasks[task.columnId].reduce(
      (acc, item) => (item.order > acc ? item.order : acc),
      0
    );

    try {
      const newTask = await createTask(task.boardId, task.columnId, {
        title: task.title,
        description: task.description,
        order: tasksCount ? maxTaskOrder + 1 : 0,
        userId: task.userId,
        users: task.users,
      });

      return newTask;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const updateColumnTask = createAsyncThunk(
  'column/updateColumnTask',
  async (data: { task: ITask; oldColumnId: string }, { rejectWithValue }) => {
    try {
      const newTask = await updateTask(data.task.boardId, data.oldColumnId, data.task._id, {
        title: data.task.title,
        description: data.task.description,
        columnId: data.task.columnId,
        order: data.task.order,
        userId: data.task.userId,
        users: data.task.users,
      });

      return { task: newTask, oldColumnId: data.oldColumnId };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const updateTasksOrder = createAsyncThunk(
  'column/updateTasksOrder',
  async (tasks: ITask[], { rejectWithValue }) => {
    const tasksData = tasks.map((item) => ({
      _id: item._id,
      order: item.order,
      columnId: item.columnId,
    }));
    try {
      const newTasks = await updateTasksSet(tasksData);

      return newTasks;
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
      const tasks = state.tasks[deletedTask.columnId];

      const newTasks = tasks?.filter((task) => task._id !== deletedTask._id);
      state.tasks[deletedTask.columnId] = newTasks || [];

      state.isPending = false;
    });
    builder.addCase(deleteColumnTask.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(createColumnTask.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createColumnTask.fulfilled, (state, action) => {
      const newTask = action.payload;

      const tasks = state.tasks[newTask.columnId];
      const newTasks = [...tasks, newTask];

      state.tasks[newTask.columnId] = newTasks || [];

      state.isPending = false;
    });
    builder.addCase(createColumnTask.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(updateColumnTask.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateColumnTask.fulfilled, (state, action) => {
      const { task, oldColumnId } = action.payload;

      if (oldColumnId !== task.columnId) {
        const oldColumnTasks = state.tasks[oldColumnId].filter((item) => item._id !== task._id);
        state.tasks[oldColumnId] = oldColumnTasks;

        const newColumnTasks = state.tasks[task.columnId];
        const maxTaskOrder = newColumnTasks.reduce(
          (acc, item) => (item.order > acc ? item.order : acc),
          0
        );
        task.order = newColumnTasks.length ? maxTaskOrder + 1 : 0;
        state.tasks[task.columnId] = [...newColumnTasks, task];
      } else {
        const taskIndex = state.tasks[task.columnId].findIndex((item) => item._id === task._id);
        state.tasks[task.columnId][taskIndex] = task;
      }

      state.isPending = false;
    });
    builder.addCase(updateColumnTask.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(updateTasksOrder.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateTasksOrder.fulfilled, (state, action) => {
      const tasks = action.payload;
      const columnIds = Object.keys(state.tasks);

      columnIds.forEach(
        (columnId) =>
          (state.tasks[columnId] = tasks
            .filter((item) => item.columnId === columnId)
            .sort((task1, task2) => (task1.order < task2.order ? -1 : 1)))
      );

      state.isPending = false;
    });
    builder.addCase(updateTasksOrder.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});

export default columnSlice.reducer;
