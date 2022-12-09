import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBoard } from 'api/boards';
import {
  createColumn,
  deleteColumn,
  getColumnsInBoard,
  updateColumn,
  updateColumnsSet,
} from 'api/columns';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { RootState } from 'store/store';
import IBoard from 'types/IBoard';
import IColumn from 'types/IColumn';
import { checkBoardExistence, checkColumnExistence } from 'utils/checkElementExistence';
import { setActiveBoard } from './boardsSlice';

interface IBoardState extends IBoard {
  selectedColumn: IColumn | null;
  columns: IColumn[];
  isPending: boolean;
  isTokenExpired: boolean;
  isInexistentColumn: boolean;
}

const initialState: IBoardState = {
  _id: '',
  title: '',
  description: '',
  owner: '',
  users: [],
  selectedColumn: null,
  columns: [],
  isPending: false,
  isTokenExpired: false,
  isInexistentColumn: false,
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
      await checkBoardExistence(data.column.boardId);
      await checkColumnExistence(data.column.boardId, data.column._id);

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
      await checkBoardExistence(data.boardId);
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
  async (column: IColumn, { rejectWithValue, getState, dispatch }) => {
    try {
      await checkBoardExistence(column.boardId);
      await checkColumnExistence(column.boardId, column._id);

      const columnTasks = (getState() as RootState).column.tasks[column._id];

      const deletedColumn = await deleteColumn(column.boardId, column._id);

      const taskOtherColumns = Object.entries((getState() as RootState).column.tasks)
        .filter((item) => item[0] !== column._id)
        .map((item) => item[1])
        .flat();

      const usersOnlyInDeletedColumnTasks: string[] = [];

      columnTasks.forEach((item) => {
        if (!item.users[0]) return;
        if (!taskOtherColumns.find((task) => task.users.includes(item.users[0]))) {
          usersOnlyInDeletedColumnTasks.push(item.users[0]);
        }
      });

      const currentBoard = (getState() as RootState).boards.activeBoard;
      if (!currentBoard) return deletedColumn;

      const newBoardUsers = currentBoard.users.filter(
        (item) => !usersOnlyInDeletedColumnTasks.includes(item)
      );

      await updateBoard(currentBoard._id, {
        title: currentBoard.title,
        description: currentBoard.description,
        owner: currentBoard.owner,
        users: [...newBoardUsers],
      });
      dispatch(
        setActiveBoard({
          _id: currentBoard._id,
          title: currentBoard.title,
          description: currentBoard.description,
          owner: currentBoard.owner,
          users: [...newBoardUsers],
        })
      );

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
  async (columns: IColumn[], { rejectWithValue, dispatch }) => {
    try {
      dispatch(setColumns(columns));

      await checkBoardExistence(columns[0].boardId);

      const columnsData = columns.map((item) => ({ _id: item._id, order: item.order }));

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
  reducers: {
    resetBoardTokenExpiration(state) {
      state.isTokenExpired = false;
    },
    setColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
    setSelectedColumn(state, action: PayloadAction<IColumn | null>) {
      state.selectedColumn = action.payload;
    },
    setIsInexistentColumn(state) {
      state.isInexistentColumn = false;
    },
  },
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

      if (action.payload === StatusCodes.NOT_FOUND) {
        state.isInexistentColumn = true;
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

      if (action.payload === StatusCodes.NOT_FOUND) {
        state.isInexistentColumn = true;
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

      if (action.payload === StatusCodes.NOT_FOUND) {
        state.isInexistentColumn = true;
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

      if (action.payload === StatusCodes.NOT_FOUND) {
        state.isInexistentColumn = true;
      }
    });
  },
});

export default boardSlice.reducer;
export const { resetBoardTokenExpiration, setColumns, setSelectedColumn, setIsInexistentColumn } =
  boardSlice.actions;
