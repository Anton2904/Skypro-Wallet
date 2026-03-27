import { useEffect, useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import { LoaderBlock } from '../components/LoaderBlock';
import PeriodCalendar from '../components/PeriodCalendar';
import { CATEGORY_OPTIONS, toInputDate } from '../api/helpers';
import { getTransactionsByPeriod } from '../api/transactionsApi';
import { useTransactions } from '../context/TransactionsContext';
import { formatDate } from '../utils/formatters';

const periodTitles = {
  day: 'Расходы за выбранный день',
  week: 'Расходы за 7 дней до выбранной даты',
  month: 'Расходы с начала выбранного месяца до выбранной даты',
};

function AnalysisPage() {
  const [period, setPeriod] = useState('month');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [periodError, setPeriodError] = useState('');
  const [isPeriodLoading, setIsPeriodLoading] = useState(false);
  const { transactions, isLoading, error } = useTransactions();

  useEffect(() => {
    if (!transactions.length) {
      setSelectedDate((current) => current || toInputDate(new Date()));
      return;
    }

    const hasCurrentDate = transactions.some((item) => toInputDate(item.date) === selectedDate);

    if (!selectedDate || !hasCurrentDate) {
      setSelectedDate(toInputDate(transactions[0].date));
    }
  }, [transactions, selectedDate]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const loadPeriodTransactions = async () => {
      try {
        setIsPeriodLoading(true);
        setPeriodError('');
        const data = await getTransactionsByPeriod(period, selectedDate);
        setFilteredTransactions(data);
      } catch (apiError) {
        setPeriodError(apiError.message || 'Не удалось загрузить аналитику');
      } finally {
        setIsPeriodLoading(false);
      }
    };

    loadPeriodTransactions();
  }, [period, selectedDate, transactions]);

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
  const subtitle = filteredTransactions.length
    ? `${periodTitles[period]}. Опорная дата: ${formatDate(selectedDate)}.`
    : `${periodTitles[period]}. За выбранный период расходов пока нет.`;

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
        {(isLoading || isPeriodLoading) ? <LoaderBlock text="Загружаем аналитику..." /> : null}
        <div className="analysis-grid">
          <PeriodCalendar
            period={period}
            onPeriodChange={setPeriod}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            availableDates={availableDates}
          />
          <ExpensesChart data={chartData} total={total} subtitle={subtitle} />
        </div>
      </main>
    </div>
  );
}

export default AnalysisPage;
