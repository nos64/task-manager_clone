import { findBoard } from 'api/boards';
import { getColumn } from 'api/columns';
import { findTask } from 'api/tasks';
import { AxiosError } from 'axios';

const checkResponse = <T>(response: T) => {
  if (typeof response !== 'object') {
    throw new AxiosError('Not existent board', '404', undefined, null, {
      status: 404,
      statusText: '',
      data: '',
      headers: {},
      config: {},
    });
  }
};

export const checkBoardExistence = async (boardId: string) => {
  const response = await findBoard(boardId);
  checkResponse(response);
};

export const checkColumnExistence = async (boardId: string, columnId: string) => {
  const response = await getColumn(boardId, columnId);
  checkResponse(response);
};

export const checkTaskExistence = async (boardId: string, columnId: string, taskId: string) => {
  const response = await findTask(boardId, columnId, taskId);
  checkResponse(response);
};
