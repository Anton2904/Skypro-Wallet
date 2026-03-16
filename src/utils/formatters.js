export const formatDate = (value) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('ru-RU').format(date);
};

export const formatAmount = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
