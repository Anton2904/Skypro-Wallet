import Logo from './Logo.jsx';

export default function AuthCard({ title, children, footer }) {
  return (
    <main className="auth-page">
      <div className="auth-wrap">
        <Logo />
        <section className="auth-card">
          <h1 className="auth-title">{title}</h1>
          {children}
          <div className="auth-footer">{footer}</div>
        </section>
      </div>
    </main>
  );
}
