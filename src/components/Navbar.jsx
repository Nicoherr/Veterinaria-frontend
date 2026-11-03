import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ darkMode, toggleDarkMode, isLoggedIn, logout }) {
  const { totalItems } = useCart();

  return (
    <nav className={`navbar navbar-expand-lg navbar-vetsm ${darkMode ? 'navbar-dark' : 'navbar-light'} px-3`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" aria-label="VetSM, inicio">
          <span className="brand-mark" aria-hidden="true">🐾</span>
          <span>
            VetSM
            <span className="brand-caption">Clínica veterinaria</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/servicios">Servicios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            {isLoggedIn && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/mascotas">Mis Mascotas</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/citas">Citas</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/perfil">Mi Perfil</NavLink></li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2 navbar-actions">
            <Link to="/carrito" className="btn btn-outline-primary position-relative">
              <span aria-hidden="true">🛒</span> Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" aria-label={`${totalItems} productos`}>
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="btn btn-outline-secondary"
              onClick={toggleDarkMode}
              type="button"
              aria-label="Cambiar tema"
            >
              {darkMode ? '☀️ Tema claro' : '🌙 Tema oscuro'}
            </button>
            {isLoggedIn ? (
              <button className="btn btn-outline-secondary" onClick={logout} type="button">
                Cerrar Sesión
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-primary" to="/registro">
                  Crear cuenta
                </Link>
                <Link className="btn btn-primary" to="/login">
                  Iniciar Sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
