import { formatCurrency } from '../utils/formatters.js';

const barClasses = ['bar-violet', 'bar-orange', 'bar-mint', 'bar-purple', 'bar-green', 'bar-rose'];

export default function ChartPanel({ title, data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 0;
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="panel chart-panel">
      <div className="chart-head">
        <div>
          <div className="chart-total">{formatCurrency(total)}</div>
          <div className="chart-period">{title}</div>
        </div>
      </div>

      <div className="bars">
        {data.map((item, index) => (
          <div key={item.label} className="bar-col">
            <span className="bar-value">{item.value ? formatCurrency(item.value) : '0 ₽'}</span>
            <div className="bar-track">
              <div
                className={`bar-fill ${barClasses[index % barClasses.length]}`}
                style={{ height: `${Math.max(8, (item.value / max) * 220)}px` }}
              />
            </div>
            <span className="bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
