import SectionCard from '../components/SectionCard'
import { categories, expenseRows } from '../data/mockData'

function ExpensesPage() {
  return (
    <main className="page page--expenses container">
      <h1 className="page__title">Мои расходы</h1>

      <div className="dashboard-grid dashboard-grid--expenses">
        <SectionCard title="Таблица расходов" extraClass="table-card">
          <div className="table-wrap">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                  <th aria-label="Действия" />
                </tr>
              </thead>
              <tbody>
                {expenseRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.category}</td>
                    <td>{row.date}</td>
                    <td>{row.amount}</td>
                    <td>
                      <button type="button" className="table-action" aria-label={`Меню для ${row.title}`}>
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Новый расход" extraClass="form-card">
          <form className="expense-form">
            <label className="field field--stacked">
              <span className="field__label">Описание</span>
              <input className="field__input" type="text" placeholder="Описание" />
            </label>

            <div className="field field--stacked">
              <span className="field__label">Категория</span>
              <div className="chips">
                {categories.map((category, index) => (
                  <label key={category} className={`chip ${index === 0 ? 'chip--active' : ''}`}>
                    <input type="radio" name="category" defaultChecked={index === 0} />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="field field--stacked">
              <span className="field__label">Дата</span>
              <input className="field__input" type="text" placeholder="08.07.2024" />
            </label>

            <label className="field field--stacked">
              <span className="field__label">Сумма</span>
              <input className="field__input" type="text" placeholder="1 500 ₽" />
            </label>

            <button type="button" className="button button--primary button--full">
              Добавить новый расход
            </button>
          </form>
        </SectionCard>
      </div>
    </main>
  )
}

export default ExpensesPage
