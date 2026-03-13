import AuthLayout from '../components/AuthLayout'

const fields = [
  { name: 'name', label: 'Имя', type: 'text', placeholder: 'Ева Иванова' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Эл. почта' },
  { name: 'password', label: 'Пароль', type: 'password', placeholder: 'Пароль' },
]

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      fields={fields}
      buttonText="Зарегистрироваться"
      footerText="Уже есть аккаунт?"
      footerAction="/login"
    />
  )
}

export default RegisterPage
