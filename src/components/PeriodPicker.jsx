const days = Array.from({ length: 31 }, (_, index) => index + 1);

export default function PeriodPicker({ period, onChange }) {
  return (
    <section className="panel period-panel">
      <h2 className="panel-title">Период</h2>

      <div className="period-switch">
        <button
          type="button"
          className={period === 'week' ? 'period-tab active' : 'period-tab'}
          onClick={() => onChange('week')}
        >
          7 дней
        </button>
        <button
          type="button"
          className={period === 'month' ? 'period-tab active' : 'period-tab'}
          onClick={() => onChange('month')}
        >
          Месяц
        </button>
        <button
          type="button"
          className={period === 'year' ? 'period-tab active' : 'period-tab'}
          onClick={() => onChange('year')}
        >
          Год
        </button>
      </div>

      <div className="calendar-block">
        <div className="month-title">Июль 2024</div>
        <div className="weekdays">
          <span>Пн</span>
          <span>Вт</span>
          <span>Ср</span>
          <span>Чт</span>
          <span>Пт</span>
          <span>Сб</span>
          <span>Вс</span>
        </div>
        <div className="calendar-grid">
          {days.map((day) => {
            const active =
              (period === 'week' && day >= 25 && day <= 31) ||
              (period === 'month' && day === 16) ||
              (period === 'year' && (day === 7 || day === 16 || day === 24));

            return (
              <span key={day} className={active ? 'calendar-day active' : 'calendar-day'}>
                {day}
              </span>
            );
          })}
        </div>
      </div>

      <button type="button" className="primary-button secondary-full" onClick={() => onChange('month')}>
        {period === 'month' ? 'Выбран период' : 'Выбрать период'}
      </button>
    </section>
  );
}
