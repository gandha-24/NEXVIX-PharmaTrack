import React, { useState } from 'react';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import { DataProvider } from './context/DataContext';
import NotificationToast from './components/NotificationToast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <DataProvider>
      {isAuthenticated ? (
        <Layout onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      <NotificationToast />
    </DataProvider>
  );
}

export default App;
