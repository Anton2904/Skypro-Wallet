import { useState } from 'react';
import CategoryChips from './CategoryChips';
import { validateTransaction } from '../utils/validators';

const initialState = {
  description: '',
  category: 'Еда',
  date: '',
  amount: '',
};

function NewExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validateTransaction(formData);

    if (message) {
      setError(message);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit(formData);
      setFormData(initialState);
    } catch {
      setError('Не удалось сохранить расход');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card card">
      <h2 className="card-title">Новый расход</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label>
          <span>Описание</span>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание"
            disabled={isSubmitting}
          />
        </label>

        <div>
          <span className="field-label">Категория</span>
          <CategoryChips
            value={formData.category}
            onChange={(category) => setFormData((prev) => ({ ...prev, category }))}
          />
        </div>

        <label>
          <span>Дата</span>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>

        <label>
          <span>Сумма</span>
          <input
            name="amount"
            type="number"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            disabled={isSubmitting}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохраняем...' : 'Добавить новый расход'}
        </button>
      </form>
    </div>
  );
}

export default NewExpenseForm;
