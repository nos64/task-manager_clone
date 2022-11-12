import { AxiosError } from 'axios';
import api from 'servecies';
import IUser from 'types/IUsser';

export const getUsers = async () => {
  return await api.get<AxiosError, Partial<IUser>>('/users');
};

export const getUser = async (userId: string) => {
  return await api.get<AxiosError, Partial<IUser>>(`/users/${userId}`);
};

export const updateUser = async (
  userId: string,
  options: Pick<IUser, 'login' | 'name' | 'password'>
) => {
  return await api.put<AxiosError, Partial<IUser>>(`/users/${userId}`, { ...options });
};

export const deleteUser = async (userId: string) => {
  return await api.delete<AxiosError, Partial<IUser>>(`/users/${userId}`);
};