import Logo from './Logo'

function Header({ currentPath, onNavigate }) {
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
            <button
              key={item.path}
              type="button"
              className={`header__link ${currentPath === item.path ? 'header__link--active' : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="header__logout" onClick={() => onNavigate('/login')}>
          Выйти
        </button>
      </div>
    </header>
  )
}

export default Header
