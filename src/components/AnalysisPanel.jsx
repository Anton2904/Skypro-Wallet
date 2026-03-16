import { getMonthDays, getMonthLabel } from '../utils/analytics';
import { formatCurrency } from '../utils/formatters';

const chartColors = ['purple', 'orange', 'blue', 'green', 'pink'];

function AnalysisPanel({
  month,
  day,
  total,
  chartData,
  onMonthChange,
  onDaySelect,
}) {
  const [yearString, monthString] = month.split('-');
  const year = Number(yearString);
  const monthIndex = Number(monthString) - 1;
  const monthData = getMonthDays(year, monthIndex);
  const prevMonth = new Date(year, monthIndex - 1, 1);
  const nextMonth = new Date(year, monthIndex + 1, 1);

  const maxValue = chartData.length ? Math.max(...chartData.map((item) => item.total)) : 1;

  const changeMonth = (date) => {
    const nextValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(nextValue);
  };

  const cells = [];

  for (let index = 0; index < monthData.firstWeekday; index += 1) {
    cells.push(<span className="calendar-cell is-empty" key={`empty-${index}`} />);
  }

  for (let dayNumber = 1; dayNumber <= monthData.totalDays; dayNumber += 1) {
    const formattedDay = String(dayNumber).padStart(2, '0');
    const isActive = day === formattedDay;

    cells.push(
      <button
        className={isActive ? 'calendar-cell is-active' : 'calendar-cell'}
        key={formattedDay}
        type="button"
        onClick={() => onDaySelect(isActive ? '' : formattedDay)}
      >
        {dayNumber}
      </button>
    );
  }

  return (
    <div className="analysis-grid">
      <section className="card analysis-card">
        <div className="section-title-wrap">
          <h2 className="section-title">Период</h2>
          <p className="section-subtitle">Выберите месяц и день для фильтрации расходов.</p>
        </div>

        <div className="calendar-header">
          <button className="small-nav" type="button" onClick={() => changeMonth(prevMonth)}>
            ←
          </button>
          <strong>{getMonthLabel(month)}</strong>
          <button className="small-nav" type="button" onClick={() => changeMonth(nextMonth)}>
            →
          </button>
        </div>

        <div className="weekdays">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="calendar-grid">{cells}</div>

        <div className="calendar-actions">
          <button className="ghost-button wide-button" type="button" onClick={() => onDaySelect('')}>
            Выбрать месяц
          </button>
        </div>
      </section>

      <section className="card analysis-card chart-card">
        <div className="chart-header">
          <div>
            <p className="chart-total-label">Общая сумма</p>
            <strong className="chart-total">{formatCurrency(total)}</strong>
          </div>
          <p className="chart-helper">Диаграмма по категориям расходов</p>
        </div>

        {chartData.length ? (
          <div className="bars">
            {chartData.map((item, index) => (
              <div className="bar-item" key={item.category}>
                <div className="bar-value">{formatCurrency(item.total)}</div>
                <div className={`bar color-${chartColors[index % chartColors.length]}`}>
                  <div
                    className="bar-fill"
                    style={{ height: `${Math.max(12, (item.total / maxValue) * 100)}%` }}
                  />
                </div>
                <div className="bar-label">{item.category}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-analysis">
            Нет данных за выбранный период. Попробуйте выбрать другой месяц или день.
          </div>
        )}
      </section>
    </div>
  );
}

export { AnalysisPanel };
