import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import AnalysisPage from './pages/AnalysisPage'
import ExpensesPage from './pages/ExpensesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/expenses"
          element={
            <AppLayout>
              <ExpensesPage />
            </AppLayout>
          }
        />
        <Route
          path="/analysis"
          element={
            <AppLayout>
              <AnalysisPage />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function AppLayout({ children }) {
  return (
    <div className="app-shell app-shell--dashboard">
      <Header />
      {children}
    </div>
  )
}

export default App
