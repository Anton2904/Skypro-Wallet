const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const monthFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });
const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

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

function getPeriodRange(period, selectedDate) {
  const end = new Date(selectedDate);
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);

  if (period === 'week') {
    start.setDate(end.getDate() - 6);
  }

  if (period === 'month') {
    start.setDate(1);
  }

  return { start, end };
}

function isDateInRange(date, range) {
  if (!range) {
    return false;
  }

  const current = new Date(date);
  current.setHours(0, 0, 0, 0);

  return current >= range.start && current <= range.end;
}

function PeriodCalendar({ period, onPeriodChange, selectedDate, onDateChange, availableDates = [] }) {
  const activeDate = selectedDate ? new Date(selectedDate) : new Date();
  const monthDays = getMonthDays(activeDate);
  const availableDatesSet = new Set(availableDates);
  const selectedDateObject = selectedDate ? new Date(selectedDate) : null;
  const selectedRange = selectedDateObject ? getPeriodRange(period, selectedDateObject) : null;
  const rangeText = selectedRange
    ? `${dateFormatter.format(selectedRange.start)} — ${dateFormatter.format(selectedRange.end)}`
    : 'Период не выбран';

  const changeMonth = (offset) => {
    const nextDate = new Date(activeDate.getFullYear(), activeDate.getMonth() + offset, 1);
    const currentDay = selectedDateObject?.getDate() ?? 1;
    const safeDay = Math.min(currentDay, new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate());
    nextDate.setDate(safeDay);
    onDateChange(formatDateValue(nextDate));
  };

  return (
    <aside className="period-card card">
      <h2 className="card-title">Период</h2>

      <div className="period-summary">
        <span className="period-summary__label">Выбранный интервал</span>
        <strong>{rangeText}</strong>
      </div>

      <div className="month-nav">
        <button type="button" className="period-tab period-tab--icon" onClick={() => changeMonth(-1)}>
          ←
        </button>
        <div className="month-title">{monthFormatter.format(activeDate)}</div>
        <button type="button" className="period-tab period-tab--icon" onClick={() => changeMonth(1)}>
          →
        </button>
      </div>

      <div className="weekday-row">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: monthDays.firstWeekday }).map((_, index) => (
          <span key={`empty-${index}`} className="day-pill day-pill--empty" aria-hidden="true" />
        ))}

        {Array.from({ length: monthDays.totalDays }, (_, index) => {
          const day = index + 1;
          const date = new Date(activeDate.getFullYear(), activeDate.getMonth(), day);
          const value = formatDateValue(date);
          const isSelected = selectedDateObject ? isSameDate(date, selectedDateObject) : false;
          const isInRange = isDateInRange(date, selectedRange);
          const hasTransactions = availableDatesSet.has(value);

          return (
            <button
              type="button"
              key={value}
              className={`day-pill ${isInRange ? 'day-pill--range' : ''} ${isSelected ? 'day-pill--active' : ''} ${hasTransactions ? '' : 'day-pill--ghost'}`}
              onClick={() => onDateChange(value)}
              title={hasTransactions ? 'Есть расходы в этот день' : 'Расходов в этот день пока нет'}
              aria-pressed={isSelected}
            >
              <span>{day}</span>
              {hasTransactions ? <i className="day-pill__dot" aria-hidden="true" /> : null}
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

      <div className="calendar-legend" aria-label="Подсказка по календарю">
        <span><i className="legend-dot legend-dot--selected" /> Выбранная дата</span>
        <span><i className="legend-dot legend-dot--range" /> Период анализа</span>
        <span><i className="legend-dot legend-dot--has-data" /> Есть расходы</span>
      </div>
    </aside>
  );
}

export default PeriodCalendar;
