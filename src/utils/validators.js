export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password.trim().length >= 6;

export const validateName = (name) => name.trim().length >= 2;

export const validateLoginForm = ({ email, password }) => {
  if (!validateEmail(email)) return 'Введите корректную эл. почту';
  if (!validatePassword(password)) return 'Пароль должен содержать минимум 6 символов';
  return '';
};

export const validateRegisterForm = ({ name, email, password }) => {
  if (!validateName(name)) return 'Введите имя не короче 2 символов';
  if (!validateEmail(email)) return 'Введите корректную эл. почту';
  if (!validatePassword(password)) return 'Пароль должен содержать минимум 6 символов';
  return '';
};

export const validateTransaction = ({ description, category, date, amount }) => {
  if (!description.trim()) return 'Введите описание расхода';
  if (!category.trim()) return 'Выберите категорию';
  if (!date) return 'Введите дату';
  if (!amount || Number(amount) <= 0) return 'Введите корректную сумму';
  return '';
};
