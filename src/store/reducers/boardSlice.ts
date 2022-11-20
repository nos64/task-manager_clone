import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBoard } from 'api/boards';
import { getColumnsInBoard, updateColumn } from 'api/columns';
import { AxiosError } from 'axios';
import IBoard from 'types/IBoard';
import IColumn from 'types/IColumn';

interface ICurrentBoard extends IBoard {
  columns: IColumn[];
  isLoading: boolean;
}

const initialState: ICurrentBoard = {
  _id: '',
  title: '',
  description: '',
  owner: '',
  users: [],
  columns: [],
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
  async (value: { column: IColumn; newTitle: string }, { rejectWithValue }) => {
    try {
      const newColumn = await updateColumn(value.column.boardId, value.column._id, {
        title: value.newTitle,
        order: value.column.order,
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

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload.sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
    });
    builder.addCase(setColumnTitle.fulfilled, (state, action) => {
      const columnIndex = state.columns.findIndex((item) => item._id === action.payload._id);
      state.columns[columnIndex] = action.payload;
    });
  },
});

export const { setColumns } = boardSlice.actions;
export default boardSlice.reducer;
