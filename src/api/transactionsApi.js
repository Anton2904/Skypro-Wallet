
import { seedTransactions } from '../data/seedTransactions';
import { getTransactionsStorage, saveTransactions } from '../utils/storage';

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureSeed = () => {
  const current = getTransactionsStorage();

  if (!current || current.length === 0) {
    saveTransactions(seedTransactions);
    return seedTransactions;
  }

  return current;
};

export const getTransactions = async () => {
  await wait();
  return ensureSeed();
};

export const addTransaction = async (transaction) => {
  await wait();

  const current = ensureSeed();
  const next = [
    {
      id: String(Date.now()),
      ...transaction,
      amount: Number(transaction.amount),
    },
    ...current,
  ];

  saveTransactions(next);
  return next;
};

export const deleteTransaction = async (id) => {
  await wait();

  const current = ensureSeed();
  const next = current.filter((item) => item.id !== id);

  saveTransactions(next);
  return next;
};

export const getTransactionsByPeriod = async (period) => {
  await wait();

  const current = ensureSeed();

  if (period === 'month') return current;
  if (period === 'week') return current.slice(0, 7);
  if (period === 'day') return current.slice(0, 3);

  return current;
};
