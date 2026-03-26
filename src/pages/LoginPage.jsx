import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import AuthCard from '../components/AuthCard/AuthCard';
import { useAuth } from '../hooks/useAuth';
import { validateLoginForm } from '../utils/validators';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    const message = validateLoginForm(formData);
    if (message) {
      setError(message);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const payload = await loginUser(formData);
      login(payload);
      navigate('/expenses');
    } catch (apiError) {
      setError(apiError.message || 'Не удалось выполнить вход');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Вход">
      <form className="auth-form" onSubmit={handleSubmit}>
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
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>

      <div className="auth-note">
        <p>Нужно зарегистрироваться?</p>
        <Link to="/register">Регистрируйтесь здесь.</Link>
      </div>
    </AuthCard>
  );
}

export default LoginPage;
