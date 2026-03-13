import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

function Header() {
  const navItems = [
    { path: '/expenses', label: 'Мои расходы' },
    { path: '/analysis', label: 'Анализ расходов' },
  ]

  return (
    <header className="header">
      <div className="header__inner container">
        <Logo />

        <nav className="header__nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `header__link ${isActive ? 'header__link--active' : ''}`.trim()}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/login" className="header__logout">
          Выйти
        </Link>
      </div>
    </header>
  )
}

export default Header
