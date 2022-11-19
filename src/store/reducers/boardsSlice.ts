import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, findBoard, getUserRelatedBoards, updateBoard } from 'api/boards';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { BoardPick } from 'types/APIModel';
import IBoard from 'types/IBoard';

export const createNewBoard = createAsyncThunk(
  'boards/createNewBoard',
  async (options: BoardPick, { rejectWithValue }) => {
    try {
      const newBoard = await createBoard(options);
      return newBoard;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const getBoardById = createAsyncThunk(
  'boards/getBoardById',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const board = await findBoard(boardId);
      return board;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

interface updateParams {
  boardId: string;
  options: BoardPick;
}

export const updateBoardById = createAsyncThunk<IBoard, updateParams>(
  'boards/updateBoardById',
  async ({ boardId, options }, { rejectWithValue }) => {
    try {
      const updatedBoard = await updateBoard(boardId, options);
      return updatedBoard;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const deleteBoardById = createAsyncThunk(
  'boards/deleteBoardById',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const deletedBoard = await deleteBoard(boardId);
      return deletedBoard;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

export const getBoardsByUserId = createAsyncThunk(
  'boards/getBoardsByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRelatedBoards = await getUserRelatedBoards(userId);
      return userRelatedBoards;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

interface BoardsState {
  boards: IBoard[];
  isAuthorisationError: boolean;
  isTokenRequireUpdate: boolean;
  isRoutesProtected: boolean;
  isPending: boolean;
  isBadRequest: boolean;
}

const initialState: BoardsState = {
  boards: [],
  isAuthorisationError: false,
  isTokenRequireUpdate: false,
  isRoutesProtected: false,
  isPending: false,
  isBadRequest: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewBoard.pending, (state) => {
      if (!state.isAuthorisationError && !state.isTokenRequireUpdate && !state.isRoutesProtected) {
        state.isPending = true;
      }
    });
    builder.addCase(createNewBoard.fulfilled, (state, action) => {
      if (!state.isAuthorisationError && !state.isTokenRequireUpdate && !state.isRoutesProtected) {
        state.isPending = false;
        state.boards.push(action.payload);
      }
    });
    builder.addCase(createNewBoard.rejected, (state, action) => {
      state.isPending = false;
      if (action.payload === StatusCodes.BAD_REQUEST) {
        state.isBadRequest = true;
      }
    });
  },
});
export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
