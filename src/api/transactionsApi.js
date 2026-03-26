import { api } from './client';
import { getApiErrorMessage, normalizeTransactions, toApiDate } from './helpers';

const buildQueryParams = ({ sortBy, filterBy } = {}) => {
  const params = {};

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (Array.isArray(filterBy) && filterBy.length) {
    params.filterBy = filterBy.join(',');
  }

  return params;
};

const createTransactionPayload = (transaction) => ({
  description: transaction.description.trim(),
  sum: Number(transaction.sum ?? transaction.amount),
  category: transaction.category,
  date: toApiDate(transaction.date),
});

export const getTransactions = async (options = {}) => {
  try {
    const response = await api.get('/transactions', { params: buildQueryParams(options) });
    return normalizeTransactions(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось загрузить список расходов'));
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await api.post('/transactions', createTransactionPayload(transaction));
    return normalizeTransactions(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось добавить расход'));
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return normalizeTransactions(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось удалить расход'));
  }
};

export const updateTransaction = async (id, transaction) => {
  try {
    const response = await api.patch(`/transactions/${id}`, createTransactionPayload(transaction));
    return normalizeTransactions(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось обновить расход'));
  }
};

export const getTransactionsByDateRange = async ({ start, end }) => {
  try {
    const response = await api.post('/transactions/period', {
      start: toApiDate(start),
      end: toApiDate(end),
    });

    return normalizeTransactions(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось загрузить расходы за период'));
  }
};

export const getTransactionsByPeriod = async (period, anchorDate) => {
  const end = new Date(anchorDate);

  if (Number.isNaN(end.getTime())) {
    throw new Error('Некорректная дата периода');
  }

  const start = new Date(end);

  if (period === 'day') {
    return getTransactionsByDateRange({ start: end, end });
  }

  if (period === 'week') {
    start.setDate(end.getDate() - 6);
    return getTransactionsByDateRange({ start, end });
  }

  if (period === 'month') {
    start.setDate(1);
    return getTransactionsByDateRange({ start, end });
  }

  return getTransactions();
};
