import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { formatAmount } from '../utils/formatters';

const colors = ['#c8a7ff', '#f7b53f', '#7fdcff', '#a6a2ff', '#b5e52f', '#efb2b2'];

function ExpensesChart({ data, total, subtitle }) {
  return (
    <section className="chart-card card">
      <div className="chart-total">{formatAmount(total)}</div>
      <p className="chart-subtitle">{subtitle}</p>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap={28}>
            <CartesianGrid vertical={false} stroke="transparent" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b6b73' }} />
            <YAxis hide />
            <Bar dataKey="value" radius={[8, 8, 8, 8]}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={(value) => formatAmount(value)}
                style={{ fill: '#1c1c21', fontSize: 12, fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ExpensesChart;
