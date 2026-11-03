import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const readStorageItem = (key) => {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const readStoredUser = () => {
  const token = readStorageItem('token');
  const savedUser = readStorageItem('usuario');

  if (!token || !savedUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(savedUser);
    if (!parsedUser || typeof parsedUser !== 'object') {
      throw new Error('Los datos de usuario guardados no son válidos.');
    }
    return parsedUser;
  } catch {
    return null;
  }
};

const clearAuthStorage = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('vetsm_user');
    localStorage.removeItem('vetsm_perfil');
  } catch {
    // Ignoramos errores de almacenamiento si el navegador no lo permite.
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const parsedUser = readStoredUser();

    if (!parsedUser) {
      clearAuthStorage();
      return null;
    }

    return parsedUser;
  });

  const [darkMode, setDarkMode] = useState(() => readStorageItem('vetsm_theme') === 'dark');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.setAttribute('data-bs-theme', 'dark');
      try {
        localStorage.setItem('vetsm_theme', 'dark');
      } catch {
        // Ignoramos errores de almacenamiento si el navegador no lo permite.
      }
    } else {
      document.body.classList.remove('bg-dark', 'text-white');
      document.body.removeAttribute('data-bs-theme');
      try {
        localStorage.setItem('vetsm_theme', 'light');
      } catch {
        // Ignoramos errores de almacenamiento si el navegador no lo permite.
      }
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
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.removeItem('vetsm_user');
      localStorage.removeItem('vetsm_perfil');
    } catch {
      // Ignoramos errores de almacenamiento si el navegador no lo permite.
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    clearAuthStorage();
  };

  const isLoggedIn = !!user && !!readStorageItem('token');

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, darkMode, toggleDarkMode }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};