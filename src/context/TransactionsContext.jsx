import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  addTransaction as addTransactionRequest,
  deleteTransaction as deleteTransactionRequest,
  getTransactions,
  updateTransaction as updateTransactionRequest,
} from '../api/transactionsApi';

const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshTransactions = useCallback(async (options = {}) => {
    try {
      setIsLoading(true);
      setError('');

      const data = await getTransactions({ sortBy: 'date', ...options });
      const nextTransactions = Array.isArray(data) ? data : [];

      setTransactions(nextTransactions);

      return nextTransactions;
    } catch (apiError) {
      const message = apiError.message || 'Не удалось загрузить список расходов';
      setError(message);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTransactions().catch(() => {});
  }, [refreshTransactions]);

  const applyServerTransactions = useCallback(
    async (responseData) => {
      if (Array.isArray(responseData)) {
        setTransactions(responseData);
        return responseData;
      }

      return refreshTransactions();
    },
    [refreshTransactions]
  );

  const createTransaction = useCallback(
    async (payload) => {
      try {
        setError('');

        const response = await addTransactionRequest(payload);
        return await applyServerTransactions(response);
      } catch (apiError) {
        const message = apiError.message || 'Не удалось добавить расход';
        setError(message);
        throw apiError;
      }
    },
    [applyServerTransactions]
  );

  const removeTransaction = useCallback(
    async (id) => {
      try {
        setError('');

        const response = await deleteTransactionRequest(id);
        return await applyServerTransactions(response);
      } catch (apiError) {
        const message = apiError.message || 'Не удалось удалить расход';
        setError(message);
        throw apiError;
      }
    },
    [applyServerTransactions]
  );

  const editTransaction = useCallback(
    async (id, payload) => {
      try {
        setError('');

        const response = await updateTransactionRequest(id, payload);
        return await applyServerTransactions(response);
      } catch (apiError) {
        const message = apiError.message || 'Не удалось обновить расход';
        setError(message);
        throw apiError;
      }
    },
    [applyServerTransactions]
  );

  const value = useMemo(
    () => ({
      transactions,
      isLoading,
      error,
      setError,
      refreshTransactions,
      createTransaction,
      removeTransaction,
      editTransaction,
    }),
    [transactions, isLoading, error, refreshTransactions, createTransaction, removeTransaction, editTransaction]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useTransactions must be used inside TransactionsProvider');
  }

  return context;
}