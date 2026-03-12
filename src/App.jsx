import { useEffect, useState } from 'react'
import Header from './components/Header'
import AnalysisPage from './pages/AnalysisPage'
import ExpensesPage from './pages/ExpensesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

const pageMap = {
  '/login': LoginPage,
  '/register': RegisterPage,
  '/expenses': ExpensesPage,
  '/analysis': AnalysisPage,
}

function App() {
  const [path, setPath] = useState(getCurrentPath())

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath())

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  const PageComponent = pageMap[path] ?? LoginPage
  const showHeader = path === '/expenses' || path === '/analysis'

  return (
    <div className={`app-shell ${showHeader ? 'app-shell--dashboard' : ''}`}>
      {showHeader ? <Header currentPath={path} onNavigate={navigate} /> : null}
      <PageComponent onNavigate={navigate} />
    </div>
  )
}

function getCurrentPath() {
  const knownPaths = Object.keys(pageMap)
  return knownPaths.includes(window.location.pathname) ? window.location.pathname : '/login'
}

export default App
