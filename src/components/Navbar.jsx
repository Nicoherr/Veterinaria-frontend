import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // 👈 Importamos useCart

export default function Navbar({ darkMode, toggleDarkMode, isLoggedIn, logout }) {
  const { totalItems } = useCart(); // 👈 Obtenemos el total de productos

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark border-bottom border-secondary' : 'navbar-light bg-white border-bottom shadow-sm'}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          🐾 VetSM
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/servicios">Servicios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold" to="/perfil">👤 Mi Perfil / Mascotas</NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* 🛒 Ícono del Carrito con Badge */}
            <Link to="/carrito" className="btn btn-outline-primary btn-sm position-relative">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleDarkMode}
              className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} rounded-circle`}
              title="Cambiar Modo"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {isLoggedIn ? (
              <button onClick={logout} className="btn btn-danger btn-sm fw-bold">
                Cerrar Sesión
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm fw-bold">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}