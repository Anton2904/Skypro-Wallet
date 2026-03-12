import SectionCard from '../components/SectionCard'
import { calendarDays, chartData } from '../data/mockData'

function AnalysisPage() {
  return (
    <main className="page container">
      <h1 className="page__title">Анализ расходов</h1>

      <div className="dashboard-grid dashboard-grid--analysis">
        <SectionCard title="Период" extraClass="calendar-card">
          <div className="calendar-toolbar">
            <button type="button">‹</button>
            <span>Июль 2024</span>
            <button type="button">›</button>
          </div>

          <div className="calendar-weekdays">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <button
                key={`${day}-${index}`}
                type="button"
                className={`calendar-day ${day === '27' ? 'calendar-day--active' : ''}`}
                disabled={!day}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="calendar-footer">
            <span>Август 2024</span>
            <div className="calendar-footer__days">
              {['5', '6', '7', '8', '9'].map((day) => (
                <button key={day} type="button" className="calendar-day calendar-day--mini">
                  {day}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="65 192 ₽" extraClass="chart-card">
          <p className="chart-card__period">01 июля 2024 — 31 июля 2024</p>

          <div className="chart">
            {chartData.map((item, index) => (
              <div key={item.label} className="chart__item">
                <span className="chart__value">{item.amount}</span>
                <div className={`chart__bar chart__bar--${index + 1}`} style={{ height: `${item.height}px` }} />
                <span className="chart__label">{item.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  )
}

export default AnalysisPage
