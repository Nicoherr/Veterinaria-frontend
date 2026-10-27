import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CarritoModal from './CarritoModal';

export default function Navbar({ darkMode, toggleDarkMode, isLoggedIn, logout }) {
  const { cart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const totalItems = cart ? cart.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-3 border-bottom`}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">VetSM</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/servicios">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mascotas">Mis Mascotas</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/citas">Citas</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/perfil">Mi Perfil</Link>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-primary position-relative me-2"
                onClick={() => setModalOpen(true)}
                type="button"
              >
                🛒 Carrito
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="btn btn-outline-secondary me-2"
                onClick={toggleDarkMode}
                type="button"
              >
                {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
              </button>

              {isLoggedIn ? (
                <button className="btn btn-danger" onClick={logout} type="button">
                  Cerrar Sesión
                </button>
              ) : (
                <Link className="btn btn-primary" to="/login">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CarritoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}