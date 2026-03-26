import { CATEGORY_OPTIONS } from '../api/helpers';

const validCategories = new Set(CATEGORY_OPTIONS.map((item) => item.value));

export const validatePassword = (password) => password.trim().length >= 6;

export const validateName = (name) => name.trim().length >= 2;
export const validateLogin = (login) => login.trim().length >= 3;

export const validateLoginForm = ({ login, password }) => {
  if (!validateLogin(login)) return 'Введите логин не короче 3 символов';
  if (!validatePassword(password)) return 'Пароль должен содержать минимум 6 символов';
  return '';
};

export const validateRegisterForm = ({ name, login, password }) => {
  if (!validateName(name)) return 'Введите имя не короче 2 символов';
  if (!validateLogin(login)) return 'Введите логин не короче 3 символов';
  if (!validatePassword(password)) return 'Пароль должен содержать минимум 6 символов';
  return '';
};

export const validateTransaction = ({ description, category, date, amount, sum }) => {
  if (!description.trim() || description.trim().length < 4) {
    return 'Описание должно содержать минимум 4 символа';
  }

  if (!validCategories.has(category)) return 'Выберите корректную категорию';
  if (!date) return 'Введите дату';

  const value = Number(sum ?? amount);

  if (!Number.isFinite(value) || value <= 0) return 'Введите корректную сумму';
  return '';
};
