import { useEffect, useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import PeriodCalendar from '../components/PeriodCalendar';
import { CATEGORY_OPTIONS, toInputDate } from '../api/helpers';
import { getTransactions, getTransactionsByPeriod } from '../api/transactionsApi';
import { formatDate } from '../utils/formatters';

const periodTitles = {
  day: 'Расходы за выбранный день',
  week: 'Расходы за 7 дней до выбранной даты',
  month: 'Расходы с начала выбранного месяца до выбранной даты',
};

function AnalysisPage() {
  const [period, setPeriod] = useState('month');
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAllTransactions = async () => {
      try {
        setError('');
        const data = await getTransactions({ sortBy: 'date' });
        setAllTransactions(data);

        if (data.length) {
          setSelectedDate((current) => current || toInputDate(data[0].date));
        } else {
          setSelectedDate((current) => current || toInputDate(new Date()));
        }
      } catch (apiError) {
        setError(apiError.message || 'Не удалось загрузить аналитику');
      }
    };

    loadAllTransactions();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const loadPeriodTransactions = async () => {
      try {
        setError('');
        const data = await getTransactionsByPeriod(period, selectedDate);
        setFilteredTransactions(data);
      } catch (apiError) {
        setError(apiError.message || 'Не удалось загрузить аналитику');
      }
    };

    loadPeriodTransactions();
  }, [period, selectedDate]);

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
    () => [...new Set(allTransactions.map((item) => toInputDate(item.date)).filter(Boolean))],
    [allTransactions]
  );

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content">
        <h1 className="page-title">Анализ расходов</h1>
        {error ? <p className="form-error">{error}</p> : null}
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
