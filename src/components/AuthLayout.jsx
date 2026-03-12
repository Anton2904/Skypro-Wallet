import Logo from './Logo'

function AuthLayout({ title, fields, buttonText, footerText, footerAction, onNavigate }) {
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

          <button
            type="button"
            className="button button--primary button--full"
            onClick={() => onNavigate(fieldActionPath(title))}
          >
            {buttonText}
          </button>
        </form>

        <p className="auth-card__footer">
          {footerText}{' '}
          <button type="button" className="auth-card__link" onClick={() => onNavigate(footerAction)}>
            {footerAction === '/register' ? 'Зарегистрируйтесь здесь' : 'Войдите здесь'}
          </button>
        </p>
      </section>
    </main>
  )
}

function fieldActionPath(title) {
  return title === 'Регистрация' ? '/expenses' : '/expenses'
}

export default AuthLayout
