import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createColumn,
  deleteColumn,
  getColumnsInBoard,
  updateColumn,
  updateColumnsSet,
} from 'api/columns';
import { deleteTask } from 'api/tasks';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { RootState } from 'store/store';
import IBoard from 'types/IBoard';
import IColumn from 'types/IColumn';

interface IBoardState extends IBoard {
  columns: IColumn[];
  isPending: boolean;
  isTokenExpired: boolean;
}

const initialState: IBoardState = {
  _id: '',
  title: '',
  description: '',
  owner: '',
  users: [],
  columns: [],
  isPending: false,
  isTokenExpired: false,
};

export const getColumns = createAsyncThunk(
  'board/getColumns',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const columns = await getColumnsInBoard(boardId);

      return columns;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const setColumnTitle = createAsyncThunk(
  'board/setColumnTitle',
  async (data: { column: IColumn; newTitle: string }, { rejectWithValue }) => {
    try {
      const newColumn = await updateColumn(data.column.boardId, data.column._id, {
        title: data.newTitle,
        order: data.column.order,
      });

      return newColumn;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const createBoardColumn = createAsyncThunk(
  'board/createBoardColumn',
  async (data: { boardId: string; title: string }, { rejectWithValue, getState }) => {
    const columnsCount = (getState() as RootState).board.columns.length;
    const maxColumnOrder = (getState() as RootState).board.columns.reduce(
      (acc, item) => (item.order > acc ? item.order : acc),
      0
    );

    try {
      const column = await createColumn(data.boardId, {
        title: data.title,
        order: columnsCount ? maxColumnOrder + 1 : 0,
      });

      return column;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const deleteBoardColumn = createAsyncThunk(
  'board/deleteBoardColumn',
  async (column: IColumn, { rejectWithValue, getState }) => {
    try {
      const columnTasks = (getState() as RootState).column.tasks[column._id];
      columnTasks.forEach((item) => {
        deleteTask(item.boardId, item.columnId, item._id);
      });

      const deletedColumn = await deleteColumn(column.boardId, column._id);

      return deletedColumn;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const updateColumnsOrder = createAsyncThunk(
  'board/updateColumnsOrder',
  async (columns: IColumn[], { rejectWithValue }) => {
    const columnsData = columns.map((item) => ({ _id: item._id, order: item.order }));
    try {
      const newColumns = await updateColumnsSet(columnsData);

      return newColumns;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumns.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload.sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
      state.isPending = false;
    });
    builder.addCase(getColumns.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(setColumnTitle.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(setColumnTitle.fulfilled, (state, action) => {
      const columnIndex = state.columns.findIndex((item) => item._id === action.payload._id);
      state.columns[columnIndex] = action.payload;
      state.isPending = false;
    });
    builder.addCase(setColumnTitle.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(createBoardColumn.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createBoardColumn.fulfilled, (state, action) => {
      state.columns = [...state.columns, action.payload].sort((col1, col2) =>
        col1.order < col2.order ? -1 : 1
      );
      state.isPending = false;
    });
    builder.addCase(createBoardColumn.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(deleteBoardColumn.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteBoardColumn.fulfilled, (state, action) => {
      const deletedColumnIndex = state.columns.findIndex((item) => item._id === action.payload._id);
      state.columns = [
        ...state.columns.slice(0, deletedColumnIndex),
        ...state.columns.slice(deletedColumnIndex + 1),
      ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
      state.isPending = false;
    });
    builder.addCase(deleteBoardColumn.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(updateColumnsOrder.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateColumnsOrder.fulfilled, (state, action) => {
      state.columns = action.payload;
      state.isPending = false;
    });
    builder.addCase(updateColumnsOrder.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});

export default boardSlice.reducer;
