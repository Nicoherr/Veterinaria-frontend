import { useState, useEffect } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('vetsm_session') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('vetsm_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('vetsm_session', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('vetsm_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-white');
    }
  }, [darkMode]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return {
    isLoggedIn,
    login,
    logout,
    darkMode,
    toggleDarkMode
  };
}