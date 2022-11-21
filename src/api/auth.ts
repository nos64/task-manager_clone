import { AxiosError } from 'axios';
import api from 'services';
import { SignInPick, UserPick } from 'types/APIModel';
import IUser from 'types/IUser';

export const signUp = async (options: UserPick) => {
  return await api.post<AxiosError, Pick<IUser, '_id' | 'name' | 'login'>>('/auth/signup', {
    ...options,
  });
};

export const signIn = async (options: SignInPick) => {
  return await api.post<AxiosError, Pick<IUser, 'token'>>('/auth/signin', { ...options });
};
