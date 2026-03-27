# Skypro Wallet

SPA для учета расходов на React + Vite.

## Что реализовано

- регистрация: `POST /api/user`
- вход: `POST /api/user/login`
- получение расходов: `GET /api/transactions`
- фильтрация и сортировка расходов через query params API
- добавление расхода: `POST /api/transactions`
- удаление расхода: `DELETE /api/transactions/:id`
- редактирование расхода: `PATCH /api/transactions/:id`
- аналитика за период: `POST /api/transactions/period`

## Особенности интеграции

- запросы отправляются через `fetch`
- тело запроса уходит как валидный JSON через `JSON.stringify(...)`
- заголовок `Content-Type: application/json` не задается вручную
- Bearer-токен добавляется только для авторизованных роутов
- после успешной регистрации приложение автоматически выполняет вход, если сервер не вернул токен сразу

## Переменные окружения

Создайте `.env` по примеру:

```env
VITE_API_URL=https://wedev-api.sky.pro/api
```

## Установка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run lint
```
