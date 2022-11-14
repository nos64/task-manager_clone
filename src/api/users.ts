import { AxiosError } from 'axios';
import api from 'services';
import { UserPick } from 'types/APIModel';
import IUser from 'types/IUser';

export const getUsers = async () => {
  return await api.get<AxiosError, Partial<IUser>>('/users');
};

export const getUser = async (userId: string) => {
  return await api.get<AxiosError, Partial<IUser>>(`/users/${userId}`);
};

export const updateUser = async (userId: string, options: UserPick) => {
  return await api.put<AxiosError, Partial<IUser>>(`/users/${userId}`, { ...options });
};

export const deleteUser = async (userId: string) => {
  return await api.delete<AxiosError, Partial<IUser>>(`/users/${userId}`);
};
