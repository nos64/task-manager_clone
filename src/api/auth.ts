import { AxiosError } from 'axios';
import api from 'servecies';
import IUser from 'types/IUsser';

export const signUp = async (options: Pick<IUser, 'login' | 'name' | 'password'>) => {
  return await api.post<AxiosError, Partial<IUser>>('/auth/signup', { ...options });
};

export const signIn = async (options: Pick<IUser, 'login' | 'password'>) => {
  return await api.post<AxiosError, Partial<IUser>>('/auth/signin', { ...options });
};
