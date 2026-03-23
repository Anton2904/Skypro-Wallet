const julyDays = Array.from({ length: 31 }, (_, index) => index + 1);
const augustDays = Array.from({ length: 11 }, (_, index) => index + 1);
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function PeriodCalendar({ period, onPeriodChange }) {
  return (
    <aside className="period-card card">
      <h2 className="card-title">Период</h2>
      <div className="weekday-row">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="month-title">Июль 2024</div>
      <div className="calendar-grid">
        {julyDays.map((day) => (
          <button
            type="button"
            key={`july-${day}`}
            className={`day-pill ${day === 10 ? 'day-pill--active' : ''}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="month-title month-title--second">Август 2024</div>
      <div className="calendar-grid calendar-grid--small">
        {augustDays.map((day) => (
          <button type="button" key={`aug-${day}`} className="day-pill day-pill--ghost">
            {day}
          </button>
        ))}
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
