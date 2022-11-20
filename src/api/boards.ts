import { AxiosError } from 'axios';
import api from 'services';
import { BoardPick } from 'types/APIModel';
import IBoard from 'types/IBoard';

export const getBoards = async () => {
  return await api.get<AxiosError, Partial<IBoard[]>>('/boards');
};

export const createBoard = async (options: BoardPick) => {
  return await api.post<AxiosError, IBoard>('/boards', { ...options });
};

export const findBoard = async (boardId: string) => {
  return await api.get<AxiosError, IBoard>(`/boards/${boardId}`);
};

export const updateBoard = async (boardId: string, options: BoardPick) => {
  return await api.put<AxiosError, IBoard>(`/boards/${boardId}`, { ...options });
};

export const deleteBoard = async (boardId: string) => {
  return await api.delete<AxiosError, IBoard>(`/boards/${boardId}`);
};

export const getBoardsByIds = async (ids: string[]) => {
  return await api.get<AxiosError, IBoard[]>(`boardsSet?ids=${ids.join(',')}`);
};

export const getUserRelatedBoards = async (userId: string) => {
  return await api.get<AxiosError, IBoard[]>(`boardsSet/${userId}`);
};
