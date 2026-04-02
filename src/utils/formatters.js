const formatter = new Intl.DateTimeFormat('ru-RU');

function toValidDate(value) {
  const date = value instanceof Date ? new Date(value) : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export const formatDate = (value) => {
  const date = toValidDate(value);
  return date ? formatter.format(date) : '—';
};

export const formatDateRange = (start, end) => {
  const startDate = toValidDate(start);
  const endDate = toValidDate(end);

  if (!startDate && !endDate) {
    return '—';
  }

  if (startDate && endDate) {
    return `${formatter.format(startDate)} — ${formatter.format(endDate)}`;
  }

  return formatter.format(startDate || endDate);
};

export const formatAmount = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
