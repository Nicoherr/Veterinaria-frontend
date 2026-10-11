import React from 'react';

export default function Footer({ darkMode }) {
  return (
    <footer className={`py-4 mt-auto border-top ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-light text-dark border-light-subtle'}`}>
      <div className="container text-center">
        <p className="mb-1 fw-semibold">🐾 VetSM - Veterinaria San Marcos</p>
        <small className={darkMode ? 'text-secondary' : 'text-muted'}>
          © {new Date().getFullYear()} Todos los derechos reservados. Compromiso y cuidado para tu mascota.
        </small>
      </div>
    </footer>
  );
}