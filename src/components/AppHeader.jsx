import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../hooks/useAuth';

function AppHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Logo />

        <nav className="app-nav">
          <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
            Мои расходы
          </NavLink>
          <NavLink to="/analysis" className={({ isActive }) => (isActive ? 'active' : '')}>
            Анализ расходов
          </NavLink>
        </nav>

        <button type="button" className="header-exit" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
