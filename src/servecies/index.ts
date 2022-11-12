import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from 'common/constants';

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
    if (error.response?.status === 403) {
      localStorage.removeItem('token');
    }

    throw error;
  }
);

export default api;
