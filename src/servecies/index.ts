import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from 'common/constants';
import StatusCodes from 'common/statusCodes';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  return token
    ? { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } }
    : config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;

    return data;
  },
  (error: AxiosError) => {
    if (error.response?.status === StatusCodes.EXPIRED_TOKEN) {
      localStorage.removeItem('token');
    }

    throw error;
  }
);

export default api;
