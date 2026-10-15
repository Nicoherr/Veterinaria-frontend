import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import NuevaMascota from './pages/NuevaMascota';
import MiPerfil from './pages/MiPerfil';
import FichaClinica from './pages/FichaClinica';
import Carrito from './pages/Carrito'; // 👈 Importamos

export default function App() {
  const { isLoggedIn, login, logout, darkMode, toggleDarkMode } = useAuth();

  return (
    <Routes>
      <Route
        element={
          <Layout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            logout={logout}
          />
        }
      >
        <Route index element={<Home darkMode={darkMode} />} />
        <Route path="nosotros" element={<Nosotros darkMode={darkMode} />} />
        <Route path="servicios" element={<Servicios darkMode={darkMode} />} />
        <Route path="contacto" element={<Contacto darkMode={darkMode} />} />
        <Route path="carrito" element={<Carrito darkMode={darkMode} />} />

        <Route
          path="login"
          element={
            /* Si ya está logueado, ahora lo mandamos a /perfil */
            isLoggedIn ? <Navigate to="/perfil" replace /> : <Login onLogin={login} darkMode={darkMode} />
          }
        />

        {/* Rutas Privadas / Protegidas */}
        <Route
          path="perfil"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MiPerfil darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        {/* Si alguien escribe la URL /mascotas manualmente, lo redirigimos a /perfil */}
        <Route path="mascotas" element={<Navigate to="/perfil" replace />} />

        <Route
          path="mascotas/nueva"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <NuevaMascota darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mascotas/:id/ficha"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FichaClinica darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}