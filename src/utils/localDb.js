import { demoUser, seedTransactions } from '../data/seedData';

const USERS_KEY = 'skypro-wallet-users';
const SESSION_KEY = 'skypro-wallet-session';
const TRANSACTIONS_KEY = 'skypro-wallet-transactions';

function read(key, fallback) {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function initLocalDb() {
  const users = read(USERS_KEY, []);
  const transactions = read(TRANSACTIONS_KEY, {});

  if (!users.length) {
    write(USERS_KEY, [demoUser]);
  }

  if (!Object.keys(transactions).length) {
    write(TRANSACTIONS_KEY, {
      [demoUser.id]: seedTransactions,
    });
  }
}

export function getUsers() {
  return read(USERS_KEY, []);
}

export function saveUsers(users) {
  write(USERS_KEY, users);
}

export function getSession() {
  return read(SESSION_KEY, null);
}

export function saveSession(session) {
  write(SESSION_KEY, session);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getTransactionsByUser(userId) {
  const allTransactions = read(TRANSACTIONS_KEY, {});
  return allTransactions[userId] || [];
}

export function saveTransactionsByUser(userId, transactions) {
  const allTransactions = read(TRANSACTIONS_KEY, {});
  allTransactions[userId] = transactions;
  write(TRANSACTIONS_KEY, allTransactions);
}
