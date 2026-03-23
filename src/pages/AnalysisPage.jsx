import { useEffect, useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import PeriodCalendar from '../components/PeriodCalendar';
import { getTransactionsByPeriod } from '../api/transactionsApi';

function AnalysisPage() {
  const [period, setPeriod] = useState('month');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactionsByPeriod(period);
        setTransactions(data);
      } catch {
        setError('Не удалось загрузить аналитику');
      }
    };

    loadTransactions();
  }, [period]);

  const chartData = useMemo(() => {
    const categories = ['Еда', 'Транспорт', 'Жилье', 'Развлечения', 'Образование', 'Другое'];
    return categories.map((category) => ({
      name: category,
      value: transactions
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + Number(item.amount), 0),
    }));
  }, [transactions]);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content">
        <h1 className="page-title">Анализ расходов</h1>
        {error ? <p className="form-error">{error}</p> : null}
        <div className="analysis-grid">
          <PeriodCalendar period={period} onPeriodChange={setPeriod} />
          <ExpensesChart data={chartData} total={total} />
        </div>
      </main>
    </div>
  );
}

export default AnalysisPage;
