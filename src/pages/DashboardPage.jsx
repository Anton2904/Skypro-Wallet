import { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ExpenseTable from '../components/ExpenseTable';
import NewExpenseForm from '../components/NewExpenseForm';
import { addTransaction, deleteTransaction, getTransactions } from '../api/transactionsApi';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch {
        setError('Не удалось загрузить список расходов');
      }
    };

    loadTransactions();
  }, []);

  const handleAdd = async (payload) => {
    try {
      const data = await addTransaction(payload);
      setTransactions(data);
    } catch {
      setError('Не удалось добавить расход');
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteTransaction(id);
      setTransactions(data);
    } catch {
      setError('Не удалось удалить расход');
    }
  };

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content page-content--dashboard">
        <h1 className="page-title">Мои расходы</h1>
        {error ? <p className="form-error">{error}</p> : null}
        <div className="dashboard-grid">
          <ExpenseTable transactions={transactions} onDelete={handleDelete} />
          <NewExpenseForm onSubmit={handleAdd} />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
