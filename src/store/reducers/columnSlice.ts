import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBoard } from 'api/boards';
import { createTask, deleteTask, getTasksInColumn, updateTask, updateTasksSet } from 'api/tasks';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { RootState } from 'store/store';
import ITask from 'types/ITask';
import { setActiveBoard } from './boardsSlice';

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
  async (task: ITask, { rejectWithValue, getState, dispatch }) => {
    try {
      const allBoardTasks = Object.values((getState() as RootState).column.tasks).flat();

      const deletedTask = await deleteTask(task.boardId, task.columnId, task._id);

      if (!task.users.length) return deletedTask;

      const currentBoard = (getState() as RootState).boards.activeBoard;
      if (!currentBoard) return deletedTask;

      const assigneeDeletedTask = task.users[0];
      if (!assigneeDeletedTask) return deletedTask;

      const assigneeDeletedTaskInOtherTasks = allBoardTasks.find(
        (item) => item.users.includes(assigneeDeletedTask) && item._id !== task._id
      );

      if (assigneeDeletedTaskInOtherTasks) return deletedTask;

      const usersWithoutDeletedAssignee = currentBoard.users.filter(
        (item) => item !== assigneeDeletedTask
      );

      await updateBoard(currentBoard._id, {
        title: currentBoard.title,
        description: currentBoard.description,
        owner: currentBoard.owner,
        users: [...usersWithoutDeletedAssignee],
      });
      dispatch(
        setActiveBoard({
          _id: currentBoard._id,
          title: currentBoard.title,
          description: currentBoard.description,
          owner: currentBoard.owner,
          users: [...usersWithoutDeletedAssignee],
        })
      );

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
  async (task: Omit<ITask, '_id' | 'order'>, { rejectWithValue, getState, dispatch }) => {
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

      if (task.users.length) {
        const currentBoard = (getState() as RootState).boards.activeBoard;

        if (!currentBoard) return newTask;

        if (currentBoard.users.includes(task.users[0])) return newTask;
        await updateBoard(currentBoard._id, {
          title: currentBoard.title,
          description: currentBoard.description,
          owner: currentBoard.owner,
          users: [...currentBoard.users, ...task.users],
        });

        dispatch(
          setActiveBoard({
            _id: currentBoard._id,
            title: currentBoard.title,
            description: currentBoard.description,
            owner: currentBoard.owner,
            users: [...currentBoard.users, ...task.users],
          })
        );
      }

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
  async (data: { task: ITask; oldColumnId: string }, { rejectWithValue, getState, dispatch }) => {
    const currentColumnTasks = (getState() as RootState).column.tasks[data.task.columnId];
    const oldAssignee = currentColumnTasks.find((item) => item._id === data.task._id)?.users[0];
    const newAssignee = data.task.users[0];
    const allBoardTasks = Object.values((getState() as RootState).column.tasks).flat();

    try {
      const newTask = await updateTask(data.task.boardId, data.oldColumnId, data.task._id, {
        title: data.task.title,
        description: data.task.description,
        columnId: data.task.columnId,
        order: data.task.order,
        userId: data.task.userId,
        users: data.task.users,
      });

      if (!data.task.users.length) return { task: newTask, oldColumnId: data.oldColumnId };

      const currentBoard = (getState() as RootState).boards.activeBoard;
      if (!currentBoard) return { task: newTask, oldColumnId: data.oldColumnId };

      let usersWithoutOldAssignee: string[] = [];
      if (oldAssignee && oldAssignee !== newAssignee) {
        const oldAssigneeInOtherTasks = allBoardTasks.find(
          (item) => item.users.includes(oldAssignee) && item._id !== data.task._id
        );

        if (!oldAssigneeInOtherTasks) {
          usersWithoutOldAssignee = currentBoard.users.filter((item) => item !== oldAssignee);
        } else {
          usersWithoutOldAssignee = [...currentBoard.users];
        }
      }

      if (currentBoard.users.includes(newAssignee)) {
        await updateBoard(currentBoard._id, {
          title: currentBoard.title,
          description: currentBoard.description,
          owner: currentBoard.owner,
          users: [...usersWithoutOldAssignee],
        });
        dispatch(
          setActiveBoard({
            _id: currentBoard._id,
            title: currentBoard.title,
            description: currentBoard.description,
            owner: currentBoard.owner,
            users: [...usersWithoutOldAssignee],
          })
        );
      } else {
        await updateBoard(currentBoard._id, {
          title: currentBoard.title,
          description: currentBoard.description,
          owner: currentBoard.owner,
          users: [...usersWithoutOldAssignee, ...data.task.users],
        });
        dispatch(
          setActiveBoard({
            _id: currentBoard._id,
            title: currentBoard.title,
            description: currentBoard.description,
            owner: currentBoard.owner,
            users: [...usersWithoutOldAssignee, ...data.task.users],
          })
        );
      }

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
  async (
    data: { tasks: ITask[]; oldColumnId: string; newColumnId: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(setTasks({ columnId: data.newColumnId, tasks: data.tasks }));

      const tasksData = data.tasks.map((item) => ({
        _id: item._id,
        order: item.order,
        columnId: item.columnId,
      }));

      const newTasks = await updateTasksSet(tasksData);

      return { tasks: newTasks, oldColumnId: data.oldColumnId, newColumnId: data.newColumnId };
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
    resetColumnTokenExpiration(state) {
      state.isTokenExpired = false;
    },
    setTasks(state, action: PayloadAction<{ columnId: string; tasks: ITask[] }>) {
      const { columnId, tasks } = action.payload;
      state.tasks[columnId] = tasks;
    },
  },
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
      const { tasks, oldColumnId, newColumnId } = action.payload;

      state.tasks[oldColumnId] = tasks
        .filter((item) => item.columnId === oldColumnId)
        .sort((task1, task2) => (task1.order < task2.order ? -1 : 1));

      state.tasks[newColumnId] = tasks
        .filter((item) => item.columnId === newColumnId)
        .sort((task1, task2) => (task1.order < task2.order ? -1 : 1));

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
export const { resetColumnTokenExpiration, setTasks } = columnSlice.actions;
