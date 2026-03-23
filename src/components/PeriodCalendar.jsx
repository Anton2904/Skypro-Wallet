const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const monthFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });

function getMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7;

  return {
    firstWeekday,
    totalDays: lastDay.getDate(),
  };
}

function isSameDate(left, right) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function PeriodCalendar({ period, onPeriodChange, selectedDate, onDateChange, availableDates = [] }) {
  const activeDate = selectedDate ? new Date(selectedDate) : new Date();
  const monthDays = getMonthDays(activeDate);
  const availableDatesSet = new Set(availableDates);

  const changeMonth = (offset) => {
    const nextDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + offset, 1);
    const nextSelectedDate = formatDateValue(nextDate);
    onDateChange(nextSelectedDate);
  };

  return (
    <aside className="period-card card">
      <h2 className="card-title">Период</h2>
      <div className="weekday-row">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="month-nav">
        <button type="button" className="period-tab" onClick={() => changeMonth(-1)}>
          ←
        </button>
        <div className="month-title">{monthFormatter.format(activeDate)}</div>
        <button type="button" className="period-tab" onClick={() => changeMonth(1)}>
          →
        </button>
      </div>

      <div className="calendar-grid">
        {Array.from({ length: monthDays.firstWeekday }).map((_, index) => (
          <span key={`empty-${index}`} className="day-pill day-pill--ghost" aria-hidden="true" />
        ))}

        {Array.from({ length: monthDays.totalDays }, (_, index) => {
          const day = index + 1;
          const date = new Date(activeDate.getFullYear(), activeDate.getMonth(), day);
          const value = formatDateValue(date);
          const isActive = selectedDate ? isSameDate(date, new Date(selectedDate)) : false;
          const hasTransactions = availableDatesSet.has(value);

          return (
            <button
              type="button"
              key={value}
              className={`day-pill ${isActive ? 'day-pill--active' : ''} ${!hasTransactions ? 'day-pill--ghost' : ''}`}
              onClick={() => onDateChange(value)}
              title={hasTransactions ? 'Есть расходы в этот день' : 'Расходов в этот день пока нет'}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="period-switcher">
        <button
          type="button"
          className={period === 'day' ? 'period-tab active' : 'period-tab'}
          onClick={() => onPeriodChange('day')}
        >
          День
        </button>
        <button
          type="button"
          className={period === 'week' ? 'period-tab active' : 'period-tab'}
          onClick={() => onPeriodChange('week')}
        >
          Неделя
        </button>
        <button
          type="button"
          className={period === 'month' ? 'period-tab active' : 'period-tab'}
          onClick={() => onPeriodChange('month')}
        >
          Месяц
        </button>
      </div>
    </aside>
  );
}

export default PeriodCalendar;
