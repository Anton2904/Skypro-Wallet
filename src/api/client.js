import axios from 'axios';
import { getToken, removeToken, removeUser } from '../utils/storage';

const DEFAULT_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      removeUser();
    }

    return Promise.reject(error);
  }
);
