import { CATEGORY_LABELS } from '../api/helpers';
import { formatAmount, formatDate } from '../utils/formatters';

function ExpenseTable({ transactions, onDelete }) {
  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Удалить эту транзакцию?');

    if (isConfirmed) {
      onDelete(id);
    }
  };

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
              <th aria-label="Действия"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ? (
              transactions.map((item) => (
                <tr key={item._id}>
                  <td>{item.description}</td>
                  <td>{CATEGORY_LABELS[item.category] ?? item.category}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatAmount(item.sum)}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                      aria-label={`Удалить расход ${item.description}`}
                      title="Удалить транзакцию"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="table-empty">
                  Расходов пока нет. Добавьте первую транзакцию справа.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
