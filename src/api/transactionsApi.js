import { api } from './client';
import {
  getErrorMessage,
  normalizeTransaction,
  normalizeTransactions,
} from './helpers';

const TRANSACTIONS_PATH = import.meta.env.VITE_TRANSACTIONS_PATH || '/transactions';

const sortByDateDesc = (items) =>
  [...items].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

export const getTransactions = async () => {
  try {
    const response = await api.get(TRANSACTIONS_PATH);
    return sortByDateDesc(normalizeTransactions(response.data));
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Не удалось загрузить список расходов'));
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await api.post(TRANSACTIONS_PATH, {
      description: transaction.description,
      category: transaction.category,
      date: transaction.date,
      amount: Number(transaction.amount),
    });

    return normalizeTransaction(response.data?.data ?? response.data);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Не удалось добавить расход'));
  }
};

export const deleteTransaction = async (id) => {
  try {
    await api.delete(`${TRANSACTIONS_PATH}/${id}`);
    return id;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Не удалось удалить расход'));
  }
};
