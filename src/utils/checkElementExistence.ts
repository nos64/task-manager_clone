import { findBoard } from 'api/boards';
import { getColumn } from 'api/columns';
import { findTask } from 'api/tasks';
import { AxiosError } from 'axios';

const checkresponse = <T>(response: T) => {
  if (typeof response !== 'object') {
    throw new AxiosError('Not ixestent board', '404', undefined, null, {
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
  checkresponse(response);
};

export const checkColumnExistence = async (boardId: string, columnId: string) => {
  const response = await getColumn(boardId, columnId);
  checkresponse(response);
};

export const checkTaskExistence = async (boardId: string, columnId: string, taskId: string) => {
  const response = await findTask(boardId, columnId, taskId);
  checkresponse(response);
};
