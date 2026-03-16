import { formatAmount, formatDate } from '../utils/formatters';

function ExpenseTable({ transactions, onDelete }) {
  return (
    <div className="table-card card">
      <h2 className="card-title">Таблица расходов</h2>
      <div className="table-wrap">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Описание</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatAmount(item.amount)}</td>
                <td>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                    aria-label="Удалить расход"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
