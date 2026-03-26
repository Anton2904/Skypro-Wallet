export const CATEGORY_LABELS = {
  food: 'Еда',
  transport: 'Транспорт',
  housing: 'Жилье',
  joy: 'Развлечения',
  education: 'Образование',
  others: 'Другое',
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const pad = (value) => String(value).padStart(2, '0');

export const toApiDate = (value) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const toInputDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const normalizeTransaction = (item) => ({
  _id: item._id ?? item.id,
  id: item._id ?? item.id,
  userId: item.userId,
  description: item.description ?? '',
  category: item.category ?? 'others',
  date: item.date,
  sum: Number(item.sum ?? item.amount ?? 0),
  amount: Number(item.sum ?? item.amount ?? 0),
});

export const normalizeTransactions = (items) =>
  Array.isArray(items) ? items.map(normalizeTransaction) : [];

export const normalizeAuthResponse = (data, fallbackUser = {}) => {
  if (typeof data === 'string') {
    return {
      token: data,
      user: {
        name: fallbackUser.name ?? fallbackUser.login ?? '',
        login: fallbackUser.login ?? '',
        email: fallbackUser.login ?? '',
      },
    };
  }

  const token =
    data?.token ??
    data?.accessToken ??
    data?.user?.token ??
    data?.user?.accessToken ??
    data?.data?.token ??
    data?.data?.accessToken ??
    '';

  const responseUser = data?.user ?? data?.data?.user ?? data?.data ?? {};
  const login = responseUser.login ?? fallbackUser.login ?? '';

  return {
    token,
    user: {
      name: responseUser.name ?? fallbackUser.name ?? login,
      login,
      email: login,
    },
  };
};

export const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  const message =
    data?.error ||
    data?.message ||
    data?.details ||
    (Array.isArray(data?.errors) ? data.errors.join(', ') : '') ||
    error?.message;

  return typeof message === 'string' && message.trim() ? message : fallbackMessage;
};
