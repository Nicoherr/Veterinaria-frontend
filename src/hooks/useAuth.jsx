import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('usuario');
    if (!token || !savedUser) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('vetsm_user');
      return null;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      if (!parsedUser || typeof parsedUser !== 'object') {
        throw new Error('Los datos de usuario guardados no son válidos.');
      }
      return parsedUser;
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('vetsm_user');
      return null;
    }
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

  const login = (userData, token) => {
    if (!userData || !token) {
      throw new Error('El inicio de sesión requiere un usuario y un token válidos.');
    }
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(userData));
    localStorage.removeItem('vetsm_user');
    localStorage.removeItem('vetsm_perfil');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('vetsm_user');
    localStorage.removeItem('vetsm_perfil');
  };

  const isLoggedIn = !!user && !!localStorage.getItem('token');

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