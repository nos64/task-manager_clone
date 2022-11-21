import { AxiosError } from 'axios';
import api from 'services';
import { ColumnPick } from 'types/APIModel';
import IColumn from 'types/IColumn';

export const getColumnsInBoard = async (boardId: string) => {
  return await api.get<AxiosError, IColumn[]>(`/boards/${boardId}/columns`);
};

export const createColumn = async (boardId: string, options: ColumnPick) => {
  return await api.post<AxiosError, IColumn>(`/boards/${boardId}/columns`, { ...options });
};

export const getColumn = async (boardId: string, columnId: string) => {
  return await api.get<AxiosError, IColumn>(`/boards/${boardId}/columns/${columnId}`);
};

export const updateColumn = async (boardId: string, columnId: string, options: ColumnPick) => {
  return await api.put<AxiosError, IColumn>(`/boards/${boardId}/columns/${columnId}`, {
    ...options,
  });
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  return await api.delete<AxiosError, IColumn>(`/boards/${boardId}/columns/${columnId}`);
};

export const updateColumnsSet = async (options: Pick<IColumn, '_id' | 'order'>[]) => {
  return await api.patch<AxiosError, IColumn[]>(`/columnsSet`, [...options]);
};
