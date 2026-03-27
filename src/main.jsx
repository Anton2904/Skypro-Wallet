import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TransactionsProvider } from './context/TransactionsContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
