import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function MisCitas() {
  const { darkMode } = useAuth();

  const [citas, setCitas] = useState([
    {
      id: 1,
      mascota: 'Firulais',
      especie: 'Perro',
      servicio: 'Consulta General',
      fecha: '2026-10-22',
      hora: '10:30 hrs',
      veterinario: 'Dr. Ricardo Morales',
      estado: 'Confirmada',
    },
    {
      id: 2,
      mascota: 'Michi',
      especie: 'Gato',
      servicio: 'Vacunación y Desparasitación',
      fecha: '2026-11-05',
      hora: '16:00 hrs',
      veterinario: 'Dra. Camila Soto',
      estado: 'Confirmada',
    },
    {
      id: 3,
      mascota: 'Firulais',
      especie: 'Perro',
      servicio: 'Exámenes de Laboratorio',
      fecha: '2026-08-14',
      hora: '11:00 hrs',
      veterinario: 'Dr. Ricardo Morales',
      estado: 'Realizada',
    },
  ]);

  const cardClass = darkMode
    ? 'bg-dark text-white border-secondary'
    : 'bg-white text-dark border-light-subtle';

  const handleCancelarCita = (id) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      setCitas((prev) =>
        prev.map((cita) =>
          cita.id === id ? { ...cita, estado: 'Cancelada' } : cita
        )
      );
    }
  };

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="h4 fw-bold text-primary m-0">📅 Mis Citas Médicas</h3>
          <p className="text-secondary small m-0">Gestiona las atenciones agendadas para tus mascotas.</p>
        </div>
        <Link to="/contacto" className="btn btn-primary btn-sm fw-semibold">
          ➕ Agendar Nueva Cita
        </Link>
      </div>

      {citas.length === 0 ? (
        <div className={`alert ${darkMode ? 'alert-dark text-white border-secondary' : 'alert-info'} text-center py-4`}>
          <p className="m-0">No tienes citas médicas agendadas actualmente.</p>
          <Link to="/contacto" className="btn btn-outline-primary btn-sm mt-3">
            Agendar una cita ahora
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {citas.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className={`card h-100 shadow-sm ${cardClass}`}>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold m-0 text-primary">
                      {c.servicio}
                    </h5>
                    <span
                      className={`badge ${
                        c.estado === 'Confirmada'
                          ? 'bg-success'
                          : c.estado === 'Realizada'
                          ? 'bg-secondary'
                          : 'bg-danger'
                      }`}
                    >
                      {c.estado}
                    </span>
                  </div>

                  <p className="fw-semibold mb-2">
                    🐾 Mascota: <span className="fw-normal">{c.mascota} ({c.especie})</span>
                  </p>

                  <div className="small text-secondary mb-3">
                    <div>🗓️ <strong>Fecha:</strong> {c.fecha}</div>
                    <div>⏰ <strong>Hora:</strong> {c.hora}</div>
                    <div>👨‍⚕️ <strong>Atiende:</strong> {c.veterinario}</div>
                  </div>

                  <div className="mt-auto pt-2 border-top border-secondary-subtle d-flex justify-content-end">
                    {c.estado === 'Confirmada' && (
                      <button
                        onClick={() => handleCancelarCita(c.id)}
                        className="btn btn-outline-danger btn-sm fw-semibold"
                      >
                        Cancelar Cita
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}