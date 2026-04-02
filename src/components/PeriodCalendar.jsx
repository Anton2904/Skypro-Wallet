const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const monthFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });

function normalizeDate(value) {
  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameDate(left, right) {
  return Boolean(left && right) && left.getTime() === right.getTime();
}

function isDateInRange(date, startDate, endDate) {
  if (!startDate || !endDate) {
    return false;
  }

  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
}

function buildMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const cells = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    cells.push(new Date(year, month, day));
  }

  return cells;
}

function PeriodCalendar({ startDate, endDate, onRangeChange, availableDates = [] }) {
  const normalizedStart = normalizeDate(startDate);
  const normalizedEnd = normalizeDate(endDate);
  const anchorDate = normalizedEnd || normalizedStart || normalizeDate(new Date());
  const activeYear = anchorDate.getFullYear();
  const availableDatesSet = new Set(availableDates);
  const months = Array.from({ length: 12 }, (_, monthIndex) => new Date(activeYear, monthIndex, 1));

  const handleDayClick = (date) => {
    const clickedValue = formatDateValue(date);

    if (!normalizedStart || (normalizedStart && normalizedEnd)) {
      onRangeChange({ start: clickedValue, end: '' });
      return;
    }

    if (date.getTime() < normalizedStart.getTime()) {
      onRangeChange({
        start: clickedValue,
        end: formatDateValue(normalizedStart),
      });
      return;
    }

    onRangeChange({
      start: formatDateValue(normalizedStart),
      end: clickedValue,
    });
  };

  return (
    <aside className="period-card card">
      <h2 className="card-title">Период</h2>

      <div className="calendar-scroll">
        {months.map((monthDate) => {
          const monthCells = buildMonth(monthDate);

          return (
            <section className="calendar-month" key={monthDate.toISOString()}>
              <h3 className="calendar-month__title">{monthFormatter.format(monthDate)}</h3>

              <div className="calendar-weekdays">
                {WEEK_DAYS.map((day) => (
                  <span key={`${monthDate.getMonth()}-${day}`}>{day}</span>
                ))}
              </div>

              <div className="calendar-grid calendar-grid--month">
                {monthCells.map((cell, index) => {
                  if (!cell) {
                    return <span key={`empty-${monthDate.getMonth()}-${index}`} className="calendar-day calendar-day--empty" />;
                  }

                  const value = formatDateValue(cell);
                  const isStart = isSameDate(cell, normalizedStart);
                  const isEnd = isSameDate(cell, normalizedEnd);
                  const isSelected = isStart || isEnd;
                  const isInSelectedRange = isDateInRange(cell, normalizedStart, normalizedEnd);
                  const hasTransactions = availableDatesSet.has(value);

                  return (
                    <button
                      type="button"
                      key={value}
                      className={[
                        'calendar-day',
                        isInSelectedRange ? 'calendar-day--range' : '',
                        isSelected ? 'calendar-day--selected' : '',
                        isStart ? 'calendar-day--start' : '',
                        isEnd ? 'calendar-day--end' : '',
                        hasTransactions ? 'calendar-day--has-data' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleDayClick(cell)}
                      aria-pressed={isSelected}
                    >
                      <span>{cell.getDate()}</span>
                      {hasTransactions ? <i className="calendar-day__dot" aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="calendar-hint">
        <span>Выберите период двумя кликами: начало и конец.</span>
        <span>Третий клик начинает новый интервал.</span>
      </div>
    </aside>
  );
}

export default PeriodCalendar;
