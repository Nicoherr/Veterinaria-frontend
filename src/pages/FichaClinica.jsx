import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api.js';

export default function FichaClinica({ darkMode }) {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  useEffect(() => {
    let active = true;
    apiFetch(`/mascotas/${id}`)
      .then((data) => {
        if (!data || typeof data !== 'object') {
          throw new Error('La respuesta del servidor no contiene los datos de la mascota.');
        }
        if (active) setMascota(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'No fue posible cargar la ficha clínica.');
      })
      .finally(() => {
        if (active) setCargando(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (cargando) {
    return <p role="status">Cargando ficha clínica...</p>;
  }

  return (
    <div className="py-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">📋 Ficha Clínica Veterinaria</h1>
          <p className="text-secondary m-0">Ficha de {mascota?.nombre || 'mascota'}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/mascotas" className="btn btn-outline-secondary fw-semibold">Volver a mis mascotas</Link>
          <button className="btn btn-outline-primary fw-semibold" onClick={() => window.print()}>
            🖨️ Imprimir Ficha
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {mascota && (
        <>
          <div className={`card p-4 shadow-sm mb-4 ${cardClass}`}>
            <h2 className="h5 text-info fw-bold border-bottom pb-2 mb-3">🐾 Paciente: {mascota.nombre}</h2>
            <div className="row g-3 text-secondary">
              <div className="col-md-4"><strong>Especie:</strong> {mascota.tipo || 'No registrada'}</div>
              <div className="col-md-4"><strong>Raza:</strong> {mascota.raza || 'No registrada'}</div>
              <div className="col-md-4"><strong>Edad:</strong> {mascota.edad == null ? 'No registrada' : `${mascota.edad} años`}</div>
              <div className="col-md-4"><strong>Microchip:</strong> {mascota.microchip || 'Sin registrar'}</div>
              <div className="col-md-4"><strong>Tutor:</strong> {mascota.usuario?.nombre || mascota.usuario?.email || 'No disponible'}</div>
            </div>
          </div>

          <div className={`card p-4 shadow-sm ${cardClass}`}>
            <h3 className="h5 text-info fw-bold border-bottom pb-2 mb-3">🩺 Historial clínico</h3>
            <p className="text-secondary mb-0">
              El sistema todavía no dispone de registros de consultas o vacunas para esta mascota.
            </p>
          </div>
        </>
      )}
    </div>
  );
}