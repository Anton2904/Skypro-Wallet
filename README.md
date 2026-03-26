# Skypro Wallet

Skypro Wallet — React-приложение для учета личных расходов с подключением к реальному backend API.

## Что изменено

- убрана работа с транзакциями через `localStorage`
- авторизация и регистрация выполняются через HTTP-запросы
- список расходов загружается с сервера
- создание и удаление расходов выполняются на сервере
- `localStorage` используется только для хранения токена и данных текущего пользователя
- добавлен единый `axios`-клиент с автоматической подстановкой `Authorization: Bearer <token>`

## Стек технологий

- React
- Vite
- React Router DOM
- Axios
- Recharts
- ESLint
- Prettier

## Настройка окружения

Создайте файл `.env` на основе примера:

```bash
cp .env.example .env
```

Укажите адрес вашего backend и, при необходимости, пути endpoint:

```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_LOGIN_PATH=/auth/login
VITE_AUTH_REGISTER_PATH=/auth/register
VITE_TRANSACTIONS_PATH=/transactions
```

## Запуск проекта

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Проверка кода

```bash
npm run lint
```

## Какой формат ответов поддерживается

Приложение умеет работать как минимум с такими вариантами ответов backend:

### Авторизация / регистрация

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "name": "Иван",
    "email": "ivan@example.com"
  }
}
```

или

```json
{
  "data": {
    "accessToken": "jwt-token",
    "user": {
      "id": 1,
      "name": "Иван",
      "email": "ivan@example.com"
    }
  }
}
```

### Список транзакций

```json
[
  {
    "id": 1,
    "description": "Продукты",
    "category": "Еда",
    "date": "2026-03-24",
    "amount": 1500
  }
]
```

или

```json
{
  "data": {
    "items": [
      {
        "id": 1,
        "description": "Продукты",
        "category": "Еда",
        "date": "2026-03-24",
        "amount": 1500
      }
    ]
  }
}
```

## Важное замечание

Я не получил от вас документацию backend, поэтому проект подготовлен в рабочем виде с настраиваемыми endpoint через `.env` и с нормализацией нескольких популярных форматов ответов API. Если ваш сервер использует другие поля ответа, их можно быстро подстроить в файле `src/api/helpers.js`.
