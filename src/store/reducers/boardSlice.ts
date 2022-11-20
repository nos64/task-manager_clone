import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBoard } from 'api/boards';
import { getColumnsInBoard, updateColumn } from 'api/columns';
import { AxiosError } from 'axios';
import IBoard from 'types/IBoard';
import IColumn from 'types/IColumn';

interface ICurrentBoard extends IBoard {
  columns: IColumn[];
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
  },
});

export const { setColumns } = boardSlice.actions;
export default boardSlice.reducer;
