import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import { useAuth } from '../hooks/useAuth.js';

export default function Header() {
  const { signOut } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Logo />
        <nav className="topnav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'topnav-link active' : 'topnav-link')}
          >
            Мои расходы
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) => (isActive ? 'topnav-link active' : 'topnav-link')}
          >
            Анализ расходов
          </NavLink>
        </nav>
        <button type="button" className="logout-link" onClick={signOut}>
          Выйти
        </button>
      </div>
    </header>
  );
}
