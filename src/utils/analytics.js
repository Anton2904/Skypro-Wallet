import { categories } from './mockData.js';

function isInPeriod(dateValue, period) {
  const date = new Date(dateValue);
  const border = new Date('2024-07-31');

  if (period === 'week') {
    const start = new Date('2024-07-24');
    return date >= start && date <= border;
  }

  if (period === 'month') {
    return date.getMonth() === 6 && date.getFullYear() === 2024;
  }

  return date.getFullYear() === 2024;
}

export function getChartData(items, period) {
  const filtered = items.filter((item) => isInPeriod(item.date, period));

  return categories.map((category) => ({
    label: category,
    value: filtered
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + Number(item.amount), 0),
  }));
}

export function getPeriodTitle(period) {
  if (period === 'week') return 'За 7 дней';
  if (period === 'year') return 'За 2024 год';
  return 'За июль 2024';
}
