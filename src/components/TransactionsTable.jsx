import { formatCurrency, formatDate } from '../utils/formatters.js';

export default function TransactionsTable({ items, onDelete }) {
  return (
    <section className="panel table-panel">
      <h2 className="panel-title">Таблица расходов</h2>
      <div className="table-wrap">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Описание</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td className="table-action-cell">
                  <button type="button" className="more-button" onClick={() => onDelete(item.id)}>
                    ⋯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
