import { AxiosError } from 'axios';
import api from 'services';
import { UserPick, UserResponsePick } from 'types/APIModel';

export const getUsers = async () => {
  return await api.get<AxiosError, UserResponsePick[]>('/users');
};

export const getUser = async (userId: string) => {
  return await api.get<AxiosError, UserResponsePick>(`/users/${userId}`);
};

export const updateUser = async (userId: string, options: UserPick) => {
  return await api.put<AxiosError, UserResponsePick>(`/users/${userId}`, { ...options });
};

export const deleteUser = async (userId: string) => {
  return await api.delete<AxiosError, UserResponsePick>(`/users/${userId}`);
};
