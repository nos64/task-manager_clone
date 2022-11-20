import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBoard } from 'api/boards';
import { createColumn, deleteColumn, getColumnsInBoard, updateColumn } from 'api/columns';
import { AxiosError } from 'axios';
import IBoard from 'types/IBoard';
import IColumn from 'types/IColumn';

interface IBoardState extends IBoard {
  columns: IColumn[];
  isPending: boolean;
}

const initialState: IBoardState = {
  _id: '',
  title: '',
  description: '',
  owner: '',
  users: [],
  columns: [],
  isPending: false,
};

export const getColumns = createAsyncThunk(
  'board/getColumns',
  async (id: string, { rejectWithValue }) => {
    try {
      id = '637899303b52a5922e7c5655';
      const columns = await getColumnsInBoard(id);

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
  async (data: { boardId: string; title: string; order: number }, { rejectWithValue }) => {
    try {
      const column = await createColumn(data.boardId, { title: data.title, order: data.order });

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
  async (column: IColumn, { rejectWithValue }) => {
    try {
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

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
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
      console.log(action.payload);
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
      console.log(action.payload);
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
      console.log(action.payload);
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
      console.log(action.payload);
    });
  },
});

export const { setColumns } = boardSlice.actions;
export default boardSlice.reducer;
