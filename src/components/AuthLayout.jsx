import { Link } from 'react-router-dom'
import Logo from './Logo'

function AuthLayout({ title, fields, buttonText, footerText, footerAction }) {
  return (
    <main className="auth-screen">
      <div className="auth-screen__brand">
        <Logo />
      </div>

      <section className="auth-card">
        <h1 className="auth-card__title">{title}</h1>

        <form className="auth-card__form">
          {fields.map((field) => (
            <label key={field.name} className="field">
              <span className="sr-only">{field.label}</span>
              <input className="field__input" type={field.type} name={field.name} placeholder={field.placeholder} />
            </label>
          ))}

          <Link to="/expenses" className="button button--primary button--full">
            {buttonText}
          </Link>
        </form>

        <p className="auth-card__footer">
          {footerText}{' '}
          <Link to={footerAction} className="auth-card__link">
            {footerAction === '/register' ? 'Зарегистрируйтесь здесь' : 'Войдите здесь'}
          </Link>
        </p>
      </section>
    </main>
  )
}

export default AuthLayout
