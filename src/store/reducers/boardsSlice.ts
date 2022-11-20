import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, findBoard, getUserRelatedBoards, updateBoard } from 'api/boards';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { BoardPick } from 'types/APIModel';
import IBoard from 'types/IBoard';

export const getBoardsByUserId = createAsyncThunk(
  'boards/getBoardsByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRelatedBoards = await getUserRelatedBoards(userId);
      console.log('userRelatedBoards: ', userRelatedBoards);
      return userRelatedBoards;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }

      throw error;
    }
  }
);

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

interface BoardsState {
  boards: (IBoard | undefined)[];
  isAuthorisationError: boolean;
  isTokenRequireUpdate: boolean;
  isTokenExpired: boolean;
  isPending: boolean;
  isBadRequest: boolean;
}

const initialState: BoardsState = {
  boards: [],
  isAuthorisationError: false,
  isTokenRequireUpdate: false,
  isTokenExpired: false,
  isPending: false,
  isBadRequest: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardsByUserId.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getBoardsByUserId.fulfilled, (state, action) => {
      state.isPending = false;
      state.boards = action.payload;
    });
    builder.addCase(getBoardsByUserId.rejected, (state) => {
      state.isPending = false;
    });

    builder.addCase(createNewBoard.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createNewBoard.fulfilled, (state, action) => {
      state.isPending = false;
      state.boards.push(action.payload);
    });
    builder.addCase(createNewBoard.rejected, (state, action) => {
      state.isPending = false;
      if (action.payload === StatusCodes.BAD_REQUEST) {
        state.isBadRequest = true;
      }
    });

    builder.addCase(deleteBoardById.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteBoardById.fulfilled, (state, action) => {
      state.isPending = false;
      state.boards = state.boards.filter((board) => board?._id !== action.payload._id);
    });
    builder.addCase(deleteBoardById.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.BAD_REQUEST) {
        state.isBadRequest = true;
      }
    });
    builder.addCase(updateBoardById.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateBoardById.fulfilled, (state, action) => {
      state.isPending = false;
      // state.boards = state.boards.map((board) =>
      //   board?._id === action.payload._id
      //     ? { ...board, description: action.payload.description, title: action.payload.title }
      //     : board
      // );
      // state.boards.forEach((board) => {
      //   if (board?._id === action.payload._id) {
      //     {
      //       (board.description = action.payload.description), (board.title = action.payload.title);
      //     }
      //   }
      // });
      // const modifyBoard = state.boards.find((board) => board?._id === action.payload._id);
      // modifyBoard!.description = action.payload.description;
      // modifyBoard!.title = action.payload.title;
    });
    builder.addCase(updateBoardById.rejected, (state, action) => {
      state.isPending = false;
      if (action.payload === StatusCodes.BAD_REQUEST) {
        state.isBadRequest = true;
      }
    });
  },
});
export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
