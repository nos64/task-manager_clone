import { AxiosError } from 'axios';
import api from 'services';
import { TaskPickCreate, TaskPickUpdate } from 'types/APIModel';
import ITask from 'types/ITask';

export const getTasksInColumn = async (boardId: string, columnId: string) => {
  return await api.get<AxiosError, ITask[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
};

export const createTask = async (boardId: string, columnId: string, options: TaskPickCreate) => {
  return await api.post<AxiosError, ITask>(`/boards/${boardId}/columns/${columnId}/tasks`, {
    ...options,
  });
};

export const findTask = async (boardId: string, columnId: string, taskId: string) => {
  return await api.get<AxiosError, ITask>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
};

export const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  options: TaskPickUpdate
) => {
  return await api.put<AxiosError, ITask>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    { ...options }
  );
};

export const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
  return await api.delete<AxiosError, ITask>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
  );
};

export const getTasksSet = async (ids: string[], userId: string, searchQuery: string) => {
  return await api.get<AxiosError, ITask[]>(
    `/tasksSet?ids=${ids.join(',')}&userId=${userId}&search=${searchQuery}`
  );
};

export const updateTasksSet = async (options: Pick<ITask, '_id' | 'order' | 'columnId'>[]) => {
  return await api.patch<AxiosError, ITask[]>('/tasksSet', [...options]);
};
