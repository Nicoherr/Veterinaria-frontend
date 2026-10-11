import React from 'react';
import { Link } from 'react-router-dom';
import { obtenerMascotas } from '../services/mascotasService';

export default function MisMascotas({ darkMode }) {
  const mascotas = obtenerMascotas();
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">🐾 Mis Mascotas Registradas</h1>
          <p className="text-secondary m-0">Historial médico y controles veterinarios al día.</p>
        </div>
        <Link to="/mascotas/nueva" className="btn btn-primary fw-semibold">
          ➕ Registrar Nueva Mascota
        </Link>
      </div>

      <div className="row g-4">
        {mascotas.map((m) => (
          <div key={m.id} className="col-md-6">
            <div className={`card overflow-hidden shadow-sm ${cardClass}`}>
              <div className="row g-0">
                <div className="col-sm-5 position-relative">
                  <img
                    src={m.imagen}
                    alt={m.nombre}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover', minHeight: '180px' }}
                  />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    {m.tipo}
                  </span>
                </div>
                <div className="col-sm-7">
                  <div className="card-body">
                    <h3 className="h4 fw-bold card-title mb-2">{m.nombre}</h3>
                    <ul className="list-unstyled text-secondary small mb-3">
                      <li><strong>Raza:</strong> {m.raza}</li>
                      <li><strong>Edad:</strong> {m.edad}</li>
                      <li><strong>Microchip:</strong> {m.microchip || 'Sin registrar'}</li>
                    </ul>

                    <h4 className="h6 text-info fw-bold mb-1">💉 Vacunas</h4>
                    <ul className="small text-secondary mb-2 ps-3">
                      {m.vacunas.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>

                    <h4 className="h6 text-info fw-bold mb-1">📋 Historial</h4>
                    <ul className="small text-secondary ps-3 m-0">
                      {m.historial.map((h, i) => (
                        <li key={i}>{h.detalle} ({h.fecha})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}