import { useMemo, useState } from 'react';
import FormField from './FormField.jsx';
import { categories } from '../utils/mockData.js';
import { validateTransaction } from '../utils/validators.js';

const initialForm = {
  description: '',
  category: '',
  date: '',
  amount: '',
};

export default function TransactionForm({ onSubmit }) {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const hasSelectedCategory = useMemo(() => Boolean(values.category), [values.category]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateTransaction(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    await onSubmit({
      ...values,
      amount: Number(values.amount),
    });

    setValues(initialForm);
    setErrors({});
  }

  return (
    <section className="panel side-panel">
      <h2 className="panel-title">Новый расход</h2>

      <form className="expense-form" onSubmit={handleSubmit}>
        <FormField label="Описание" error={errors.description}>
          <input
            name="description"
            value={values.description}
            onChange={handleChange}
            className={`text-input ${errors.description ? 'error' : ''}`}
            placeholder="Например"
          />
        </FormField>

        <div className="field">
          <span className="field-label">Категория {errors.category ? '*' : ''}</span>
          <div className={`category-grid ${errors.category ? 'error-wrap' : ''}`}>
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={values.category === category ? 'chip active' : 'chip'}
                onClick={() => setValues((prev) => ({ ...prev, category }))}
              >
                <span className="chip-icon">●</span>
                {category}
              </button>
            ))}
          </div>
          {errors.category ? <span className="field-error">{errors.category}</span> : null}
          {!errors.category && hasSelectedCategory ? (
            <span className="field-hint">Выбрано: {values.category}</span>
          ) : null}
        </div>

        <FormField label="Дата" error={errors.date}>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className={`text-input ${errors.date ? 'error' : ''}`}
          />
        </FormField>

        <FormField label="Сумма" error={errors.amount}>
          <input
            name="amount"
            type="number"
            value={values.amount}
            onChange={handleChange}
            className={`text-input ${errors.amount ? 'error' : ''}`}
            placeholder="1500"
          />
        </FormField>

        <button className="primary-button" type="submit">
          Добавить новый расход
        </button>
      </form>
    </section>
  );
}
