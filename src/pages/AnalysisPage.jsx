import { useEffect, useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import { LoaderBlock } from '../components/LoaderBlock';
import PeriodCalendar from '../components/PeriodCalendar';
import { CATEGORY_OPTIONS, toInputDate } from '../api/helpers';
import { getTransactionsByDateRange } from '../api/transactionsApi';
import { useTransactions } from '../context/TransactionsContext';
import { formatDateRange } from '../utils/formatters';

function AnalysisPage() {
  const [range, setRange] = useState({ start: '', end: '' });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [periodError, setPeriodError] = useState('');
  const [isPeriodLoading, setIsPeriodLoading] = useState(false);
  const { transactions, isLoading, error } = useTransactions();

  useEffect(() => {
    if (!transactions.length) {
      const today = toInputDate(new Date());
      setRange((current) => (current.start ? current : { start: today, end: today }));
      return;
    }

    setRange((current) => {
      if (current.start && current.end) {
        return current;
      }

      const latestDate = toInputDate(transactions[0].date);
      return { start: latestDate, end: latestDate };
    });
  }, [transactions]);

  useEffect(() => {
    if (!range.start || !range.end) {
      setFilteredTransactions([]);
      return;
    }

    const loadPeriodTransactions = async () => {
      try {
        setIsPeriodLoading(true);
        setPeriodError('');
        const data = await getTransactionsByDateRange({ start: range.start, end: range.end });
        setFilteredTransactions(data);
      } catch (apiError) {
        setPeriodError(apiError.message || 'Не удалось загрузить аналитику');
      } finally {
        setIsPeriodLoading(false);
      }
    };

    loadPeriodTransactions();
  }, [range.start, range.end]);

  const chartData = useMemo(
    () =>
      CATEGORY_OPTIONS.map((category) => ({
        name: category.label,
        value: filteredTransactions
          .filter((item) => item.category === category.value)
          .reduce((sum, item) => sum + Number(item.sum), 0),
      })),
    [filteredTransactions]
  );

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const subtitle = !range.start
    ? 'Выберите начальную дату периода.'
    : !range.end
      ? 'Выберите конечную дату периода вторым кликом.'
      : filteredTransactions.length
        ? `Расходы за период ${formatDateRange(range.start, range.end)}.`
        : `За период ${formatDateRange(range.start, range.end)} расходов пока нет.`;

  const availableDates = useMemo(
    () => [...new Set(transactions.map((item) => toInputDate(item.date)).filter(Boolean))],
    [transactions]
  );

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content">
        <h1 className="page-title">Анализ расходов</h1>
        {error ? <p className="form-error">{error}</p> : null}
        {periodError ? <p className="form-error">{periodError}</p> : null}
        {isLoading || isPeriodLoading ? <LoaderBlock text="Загружаем аналитику..." /> : null}
        <div className="analysis-grid">
          <PeriodCalendar
            startDate={range.start}
            endDate={range.end}
            onRangeChange={setRange}
            availableDates={availableDates}
          />
          <ExpensesChart data={chartData} total={total} subtitle={subtitle} />
        </div>
      </main>
    </div>
  );
}

export default AnalysisPage;
