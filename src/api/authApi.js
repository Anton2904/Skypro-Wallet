
import { getUser, saveUser } from '../utils/storage';

const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const registerUser = async ({ name, email, password }) => {
  await wait();

  const existingUser = getUser();
  if (existingUser?.email === email) {
    throw new Error('Пользователь с такой почтой уже зарегистрирован');
  }

  const user = { name, email, password };
  saveUser(user);

  return {
    token: `mock-token-${Date.now()}`,
    user: { name, email },
  };
};

export const loginUser = async ({ email, password }) => {
  await wait();

  const existingUser = getUser();

  if (!existingUser) {
    throw new Error('Сначала зарегистрируйтесь');
  }

  if (existingUser.email !== email || existingUser.password !== password) {
    throw new Error('Неверная почта или пароль');
  }

  return {
    token: `mock-token-${Date.now()}`,
    user: { name: existingUser.name, email: existingUser.email },
  };
};
