export const extractData = (payload) => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data;
  }

  return payload;
};

export const getErrorMessage = (error, fallbackMessage) => {
  const responseData = error?.response?.data;

  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (Array.isArray(responseData?.errors) && responseData.errors.length) {
    const firstError = responseData.errors[0];
    if (typeof firstError === 'string') return firstError;
    if (firstError?.message) return firstError.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeDate = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
};

export const normalizeUser = (user) => ({
  id: user?.id ?? user?._id ?? user?.userId ?? null,
  name: user?.name ?? user?.username ?? user?.fullName ?? '',
  email: user?.email ?? '',
});

export const normalizeAuthPayload = (payload) => {
  const data = extractData(payload) || {};
  const token = data.token ?? data.accessToken ?? data.access_token ?? data.jwt ?? '';
  const rawUser = data.user ?? data.profile ?? data.result ?? data;
  const user = normalizeUser(rawUser);

  return {
    token,
    user,
  };
};

export const normalizeTransaction = (transaction) => ({
  id: String(transaction?.id ?? transaction?._id ?? transaction?.transactionId ?? Date.now()),
  description: transaction?.description ?? transaction?.title ?? transaction?.name ?? '',
  category: transaction?.category ?? transaction?.type ?? 'Другое',
  date: normalizeDate(transaction?.date ?? transaction?.createdAt ?? transaction?.transactionDate),
  amount: toNumber(transaction?.amount ?? transaction?.sum ?? transaction?.value),
});

export const normalizeTransactions = (payload) => {
  const data = extractData(payload);

  if (Array.isArray(data)) {
    return data.map(normalizeTransaction);
  }

  if (Array.isArray(data?.items)) {
    return data.items.map(normalizeTransaction);
  }

  if (Array.isArray(data?.transactions)) {
    return data.transactions.map(normalizeTransaction);
  }

  if (Array.isArray(data?.results)) {
    return data.results.map(normalizeTransaction);
  }

  return [];
};
