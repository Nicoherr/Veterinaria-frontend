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
import MisMascotas from './pages/MisMascotas';
import NuevaMascota from './pages/NuevaMascota';
import MiPerfil from './pages/MiPerfil';
import Citas from './pages/Citas';
import FichaClinica from './pages/FichaClinica';
import Carrito from './pages/Carrito';

export default function App() {
  const { isLoggedIn, logout, darkMode, toggleDarkMode } = useAuth();

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
          element={isLoggedIn ? <Navigate to="/mascotas" replace /> : <Login darkMode={darkMode} />}
        />
        <Route
          path="mascotas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MisMascotas darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="perfil"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MiPerfil darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="citas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Citas darkMode={darkMode} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
