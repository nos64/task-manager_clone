import { findBoard } from 'api/boards';
import { AxiosError } from 'axios';

const checkBoardExistence = async (boardId: string) => {
  const response = await findBoard(boardId);

  if (typeof response && typeof response !== 'object') {
    throw new AxiosError('Not ixestent board', '404', undefined, null, {
      status: 404,
      statusText: '',
      data: '',
      headers: {},
      config: {},
    });
  }
};

export default checkBoardExistence;
