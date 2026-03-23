import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="auth-shell">
      <div className="noise-bg" />
      <div className="auth-card card">
        <div className="brand">Skypro Wallet</div>
        <h1 className="auth-title">Страница не найдена</h1>
        <p className="auth-subtitle">Такого маршрута нет. Вернитесь на главную страницу приложения.</p>
        <Link className="primary-link-button" to="/">
          На страницу входа
        </Link>
      </div>
    </section>
  );
}

export { NotFoundPage };
