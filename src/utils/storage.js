const TOKEN_KEY = 'skypro_wallet_token';
const USER_KEY = 'skypro_wallet_user';
const TRANSACTIONS_KEY = 'skypro_wallet_transactions';

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};
export const removeUser = () => localStorage.removeItem(USER_KEY);

export const saveTransactions = (items) => localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(items));
export const getTransactionsStorage = () => {
  const raw = localStorage.getItem(TRANSACTIONS_KEY);
  return raw ? JSON.parse(raw) : null;
};
