import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import AuthCard from '../components/AuthCard/AuthCard';
import { useAuth } from '../hooks/useAuth';
import { validateRegisterForm } from '../utils/validators';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: 'Ева Иванова', email: 'ivanova@mail.ru', password: '123456' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validateRegisterForm(formData);
    if (message) {
      setError(message);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const payload = await registerUser(formData);
      login(payload);
      navigate('/expenses');
    } catch (apiError) {
      setError(apiError.message || 'Не удалось выполнить регистрацию');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Регистрация">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Имя" />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Эл. почта"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        {error ? <p className="form-error form-error--center">{error}</p> : null}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="auth-note">
        <p>Уже есть аккаунт?</p>
        <Link to="/login">Войдите здесь</Link>
      </div>
    </AuthCard>
  );
}

export default RegisterPage;
