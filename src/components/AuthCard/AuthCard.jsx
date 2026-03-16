import Logo from '../Logo';

function AuthCard({ title, children }) {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="auth-header__inner">
          <Logo />
        </div>
      </header>

      <main className="auth-main">
        <section className="auth-card">
          <h1>{title}</h1>
          {children}
        </section>
      </main>
    </div>
  );
}

export default AuthCard;
