import { CATEGORY_OPTIONS } from '../api/helpers';

function CategoryChips({ value, onChange }) {
  return (
    <div className="chips-grid">
      {CATEGORY_OPTIONS.map((category) => (
        <button
          key={category.value}
          type="button"
          className={`chip ${value === category.value ? 'chip--active' : ''}`}
          onClick={() => onChange(category.value)}
        >
          <span className="chip__icon">•</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
