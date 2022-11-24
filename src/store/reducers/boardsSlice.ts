import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, findBoard, getUserRelatedBoards, updateBoard } from 'api/boards';
import { deleteColumn, getColumnsInBoard } from 'api/columns';
import { deleteTask, getTasksInColumn } from 'api/tasks';
import { AxiosError } from 'axios';
import StatusCodes from 'common/statusCodes';
import { BoardPick } from 'types/APIModel';
import IBoard from 'types/IBoard';

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
      const boardColumns = await getColumnsInBoard(boardId);
      for (const column of boardColumns) {
        const columnTasks = await getTasksInColumn(boardId, column._id);
        columnTasks.forEach((item) => {
          deleteTask(item.boardId, item.columnId, item._id);
        });
        await deleteColumn(boardId, column._id);
      }

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
  boards: IBoard[];
  isTokenExpired: boolean;
  isPending: boolean;
  activeBoard: IBoard | null;
  isBurgerOpen: boolean;
}

const initialState: BoardsState = {
  boards: [],
  isTokenExpired: false,
  isPending: false,
  activeBoard: null,
  isBurgerOpen: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoard(state, action: PayloadAction<IBoard | null>) {
      state.activeBoard = action.payload;
    },
    setIsBurgerOpen(state, action: PayloadAction<boolean>) {
      state.isBurgerOpen = action.payload;
    },
    setBoards(state, action: PayloadAction<IBoard[]>) {
      state.boards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardsByUserId.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getBoardsByUserId.fulfilled, (state, action) => {
      state.isPending = false;
      state.boards = action.payload;
    });
    builder.addCase(getBoardsByUserId.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });

    builder.addCase(createNewBoard.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createNewBoard.fulfilled, (state, action) => {
      state.isPending = false;
      state.boards.push(action.payload);
      state.activeBoard = action.payload;
    });
    builder.addCase(createNewBoard.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
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

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
    builder.addCase(updateBoardById.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateBoardById.fulfilled, (state, action) => {
      state.isPending = false;
      state.boards = state.boards.map((board) =>
        board?._id === action.payload._id
          ? { ...board, description: action.payload.description, title: action.payload.title }
          : board
      );
    });
    builder.addCase(updateBoardById.rejected, (state, action) => {
      state.isPending = false;

      if (action.payload === StatusCodes.EXPIRED_TOKEN) {
        state.isTokenExpired = true;
      }
    });
  },
});
export const { setActiveBoard, setIsBurgerOpen, setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
