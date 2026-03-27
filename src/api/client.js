import { getToken, removeToken } from '../utils/storage';

const DEFAULT_API_URL = 'https://wedev-api.sky.pro/api';
const baseURL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

const buildUrl = (path, params) => {
  const url = new URL(`${baseURL}${path}`);

  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const parseResponseBody = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const createError = (status, data, fallbackMessage) => {
  const message =
    (typeof data === 'object' && data?.message) ||
    (typeof data === 'object' && data?.error) ||
    (typeof data === 'object' && Array.isArray(data?.errors) && data.errors.join(', ')) ||
    (typeof data === 'string' && data) ||
    fallbackMessage;

  const error = new Error(message);
  error.response = { status, data };

  return error;
};

const request = async (method, path, { params, data, headers: customHeaders } = {}) => {
  const token = getToken();
  const headers = new Headers(customHeaders || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  headers.delete('Content-Type');
  headers.delete('content-type');

  let body;

  if (data !== undefined) {
    const json = JSON.stringify(data);
    body = new Blob([json]);
  }

  const response = await fetch(buildUrl(path, params), {
    method,
    headers,
    body,
  });

  const responseData = await parseResponseBody(response);

  if (response.status === 401) {
    removeToken();
  }

  if (!response.ok) {
    throw createError(response.status, responseData, 'Ошибка запроса');
  }

  return {
    data: responseData,
    status: response.status,
  };
};

export const api = {
  get: (path, config = {}) =>
    request('GET', path, {
      params: config.params,
      headers: config.headers,
    }),

  post: (path, data, config = {}) =>
    request('POST', path, {
      params: config.params,
      data,
      headers: config.headers,
    }),

  patch: (path, data, config = {}) =>
    request('PATCH', path, {
      params: config.params,
      data,
      headers: config.headers,
    }),

  delete: (path, config = {}) =>
    request('DELETE', path, {
      params: config.params,
      headers: config.headers,
    }),
};