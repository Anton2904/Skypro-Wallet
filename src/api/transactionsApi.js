import { seedTransactions } from '../data/seedTransactions';
import { getTransactionsStorage, saveTransactions } from '../utils/storage';

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const ensureSeed = () => {
  const current = getTransactionsStorage();

  if (!current || current.length === 0) {
    saveTransactions(seedTransactions);
    return seedTransactions;
  }

  return current;
};

const sortByDateDesc = (items) =>
  [...items].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

const getLatestTransactionDate = (items) => {
  const timestamps = items
    .map((item) => new Date(item.date).getTime())
    .filter((value) => !Number.isNaN(value));

  return timestamps.length ? new Date(Math.max(...timestamps)) : new Date();
};

const isSameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const isInLastDays = (date, endDate, days) => {
  const startTime = endDate.getTime() - (days - 1) * DAY_IN_MS;
  const dateTime = date.getTime();
  return dateTime >= startTime && dateTime <= endDate.getTime();
};

export const getTransactions = async () => {
  await wait();
  return sortByDateDesc(ensureSeed());
};

export const addTransaction = async (transaction) => {
  await wait();

  const current = ensureSeed();
  const next = sortByDateDesc([
    {
      id: String(Date.now()),
      ...transaction,
      amount: Number(transaction.amount),
    },
    ...current,
  ]);

  saveTransactions(next);
  return next;
};

export const deleteTransaction = async (id) => {
  await wait();

  const current = ensureSeed();
  const next = current.filter((item) => item.id !== id);

  saveTransactions(next);
  return sortByDateDesc(next);
};

export const getTransactionsByPeriod = async (period) => {
  await wait();

  const current = sortByDateDesc(ensureSeed());
  const latestDate = getLatestTransactionDate(current);

  return current.filter((item) => {
    const itemDate = new Date(item.date);

    if (period === 'day') {
      return isSameDay(itemDate, latestDate);
    }

    if (period === 'week') {
      return isInLastDays(itemDate, latestDate, 7);
    }

    if (period === 'month') {
      return (
        itemDate.getFullYear() === latestDate.getFullYear() &&
        itemDate.getMonth() === latestDate.getMonth()
      );
    }

    return true;
  });
};
