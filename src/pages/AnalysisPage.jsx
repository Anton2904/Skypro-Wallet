import { useEffect, useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import PeriodCalendar from '../components/PeriodCalendar';
import { getTransactions } from '../api/transactionsApi';
import { formatDate } from '../utils/formatters';

const categories = ['Еда', 'Транспорт', 'Жилье', 'Развлечения', 'Образование', 'Другое'];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const periodTitles = {
  day: 'Расходы за выбранный день',
  week: 'Расходы за 7 дней до выбранной даты',
  month: 'Расходы за выбранный месяц',
};

const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

const isSameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

function AnalysisPage() {
  const [period, setPeriod] = useState('month');
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setError('');
        const data = await getTransactions();
        setAllTransactions(data);

        if (data.length && !selectedDate) {
          setSelectedDate(data[0].date);
        }
      } catch {
        setError('Не удалось загрузить аналитику');
      }
    };

    loadTransactions();
  }, [selectedDate]);

  const anchorDate = useMemo(() => {
    if (isValidDate(selectedDate)) {
      return new Date(selectedDate);
    }

    if (allTransactions.length && isValidDate(allTransactions[0].date)) {
      return new Date(allTransactions[0].date);
    }

    return new Date();
  }, [allTransactions, selectedDate]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((item) => {
      const itemDate = new Date(item.date);

      if (period === 'day') {
        return isSameDay(itemDate, anchorDate);
      }

      if (period === 'week') {
        const start = new Date(anchorDate.getTime() - 6 * DAY_IN_MS);
        return itemDate >= start && itemDate <= anchorDate;
      }

      if (period === 'month') {
        return (
          itemDate.getFullYear() === anchorDate.getFullYear() &&
          itemDate.getMonth() === anchorDate.getMonth()
        );
      }

      return true;
    });
  }, [allTransactions, anchorDate, period]);

  const chartData = useMemo(
    () =>
      categories.map((category) => ({
        name: category,
        value: filteredTransactions
          .filter((item) => item.category === category)
          .reduce((sum, item) => sum + Number(item.amount), 0),
      })),
    [filteredTransactions]
  );

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const subtitle = filteredTransactions.length
    ? `${periodTitles[period]}. Опорная дата: ${formatDate(anchorDate)}.`
    : `${periodTitles[period]}. За выбранный период расходов пока нет.`;

  const availableDates = useMemo(
    () => [...new Set(allTransactions.map((item) => item.date))],
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
