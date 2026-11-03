import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-vetsm">
      <div className="container">
        <p className="mb-1"><strong>VetSM · Veterinaria San Marcos</strong></p>
        <small>
          © {new Date().getFullYear()} · Cuidamos su salud, celebramos su compañía.
        </small>
      </div>
    </footer>
  );
}
