const categories = ['Еда', 'Транспорт', 'Жилье', 'Развлечения', 'Образование', 'Другое'];

function CategoryChips({ value, onChange }) {
  return (
    <div className="chips-grid">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${value === category ? 'chip--active' : ''}`}
          onClick={() => onChange(category)}
        >
          <span className="chip__icon">•</span>
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
