import { api } from './client';
import { getErrorMessage, normalizeAuthPayload } from './helpers';

const LOGIN_PATH = import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login';
const REGISTER_PATH = import.meta.env.VITE_AUTH_REGISTER_PATH || '/auth/register';

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await api.post(REGISTER_PATH, {
      name,
      email,
      password,
    });

    const payload = normalizeAuthPayload(response.data);

    if (!payload.token) {
      throw new Error('Сервер не вернул токен после регистрации');
    }

    return payload;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Не удалось выполнить регистрацию'));
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post(LOGIN_PATH, {
      email,
      password,
    });

    const payload = normalizeAuthPayload(response.data);

    if (!payload.token) {
      throw new Error('Сервер не вернул токен после входа');
    }

    return payload;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Не удалось выполнить вход'));
  }
};
