import AuthLayout from '../components/AuthLayout'

const fields = [
  { name: 'login', label: 'Логин', type: 'text', placeholder: 'ivanova@ya.ru' },
  { name: 'password', label: 'Пароль', type: 'password', placeholder: 'Пароль' },
]

function LoginPage({ onNavigate }) {
  return (
    <AuthLayout
      title="Вход"
      fields={fields}
      buttonText="Войти"
      footerText="Нужно зарегистрироваться?"
      footerAction="/register"
      onNavigate={onNavigate}
    />
  )
}

export default LoginPage
