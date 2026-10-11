import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vetsm_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('vetsm_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('vetsm_theme', 'dark');
    } else {
      document.body.classList.remove('bg-dark', 'text-white');
      document.body.removeAttribute('data-bs-theme');
      localStorage.setItem('vetsm_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const login = (email, password) => {
    const userData = {
      email,
      nombre: email.split('@')[0],
      rol: email.includes('admin') ? 'admin' : 'cliente',
    };
    setUser(userData);
    localStorage.setItem('vetsm_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vetsm_user');
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, darkMode, toggleDarkMode }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};