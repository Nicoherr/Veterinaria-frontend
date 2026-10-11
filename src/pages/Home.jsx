import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ darkMode }) {
  const heroClass = darkMode
    ? 'bg-dark text-white border border-secondary shadow'
    : 'bg-primary-subtle text-dark border border-primary-subtle shadow-sm';

  const cardClass = darkMode 
    ? 'bg-dark text-white border-secondary h-100 shadow-sm' 
    : 'bg-white text-dark border-light-subtle h-100 shadow-sm';

  return (
    <div>
      {/* Hero Section Adaptable */}
      <div className={`p-5 mb-5 rounded-4 text-center ${heroClass}`}>
        <div className="container-fluid py-3">
          <h1 className="display-4 fw-bold text-primary mb-3">🐾 Bienvenidos a VetSM</h1>
          <p className={`col-md-8 fs-5 mx-auto ${darkMode ? 'text-light-50' : 'text-secondary'}`}>
            Atención veterinaria integral con los estándares médicos más altos. Cuidamos a tus compañeros de vida con vocación, tecnología y amor.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/contacto" className="btn btn-primary btn-lg fw-bold px-4 shadow-sm">
              📅 Agendar Consulta
            </Link>
            <Link to="/servicios" className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-primary'} btn-lg fw-bold px-4`}>
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>

      {/* Tarjetas de Servicios Rápidos */}
      <div className="row g-4 py-2">
        <div className="col-md-4">
          <div className={`card ${cardClass}`}>
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-2">🩺</div>
              <h3 className="card-title h5 fw-bold">Atención Médica 24/7</h3>
              <p className={darkMode ? 'text-light-50' : 'text-secondary'}>
                Equipo de urgencia preparado para cualquier imprevisto clínico de tu mascota.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card ${cardClass}`}>
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-2">🧪</div>
              <h3 className="card-title h5 fw-bold">Laboratorio e Imagenología</h3>
              <p className={darkMode ? 'text-light-50' : 'text-secondary'}>
                Exámenes de sangre, radiografías y ecografías con resultados inmediatos.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card ${cardClass}`}>
            <div className="card-body text-center p-4">
              <div className="fs-1 mb-2">💉</div>
              <h3 className="card-title h5 fw-bold">Vacunación y Fichas</h3>
              <p className={darkMode ? 'text-light-50' : 'text-secondary'}>
                Control digitalizado de vacunas, desparasitaciones e historial clínico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}