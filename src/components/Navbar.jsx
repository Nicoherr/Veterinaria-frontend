import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ darkMode, toggleDarkMode, isLoggedIn, logout }) {
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
              <>
                <li className="nav-item">
                  <NavLink className="nav-link fw-semibold" to="/mascotas">🐾 Mis Mascotas</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fw-semibold" to="/perfil">👤 Mis Datos</NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
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