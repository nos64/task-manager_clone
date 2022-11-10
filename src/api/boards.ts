import { AxiosError } from 'axios';
import api from 'servecies';
import IBoard from 'types/IBoard';

export const getBoards = async () => {
  return await api.get<AxiosError, Partial<IBoard[]>>('/boards');
};

export const createBoard = async (options: Pick<IBoard, 'title' | 'owner' | 'users'>) => {
  return await api.post<AxiosError, IBoard>('/boards', { ...options });
};

export const findBoard = async (boardId: string) => {
  return await api.get<AxiosError, IBoard>(`/boards/${boardId}`);
};

export const updateBoard = async (
  boardId: string,
  options: Pick<IBoard, 'title' | 'owner' | 'users'>
) => {
  return await api.put<AxiosError, IBoard>(`/boards/${boardId}`, { ...options });
};

export const deleteBoard = async (boardId: string) => {
  return await api.delete<AxiosError, IBoard>(`/boards/${boardId}`);
};

export const getBoardsByIds = async (ids: string[]) => {
  return await api.get<AxiosError, Partial<IBoard[]>>(`boardsSet?ids=${ids.join(',')}`);
};

export const getUserRelatedBoards = async (userId: string) => {
  return await api.get<AxiosError, Partial<IBoard[]>>(`boardsSet/${userId}`);
};
