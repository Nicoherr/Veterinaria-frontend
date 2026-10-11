import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ darkMode, toggleDarkMode, isLoggedIn, logout }) {
  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}