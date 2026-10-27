import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../services/api.js';

export default function MisMascotas({ darkMode }) {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [eliminando, setEliminando] = useState(null);
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';

  useEffect(() => {
    let active = true;
    apiFetch('/mascotas')
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.content ?? data?.data ?? data?.mascotas;
        if (!Array.isArray(items)) {
          throw new Error('La respuesta del servidor no contiene una lista de mascotas.');
        }
        if (active) setMascotas(items);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'No fue posible cargar las mascotas.');
      })
      .finally(() => {
        if (active) setCargando(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const eliminarMascota = async (id) => {
    setEliminando(id);
    setError('');
    try {
      await apiFetch(`/mascotas/${id}`, { method: 'DELETE' });
      setMascotas((actuales) => actuales.filter((mascota) => mascota.id !== id));
    } catch (requestError) {
      setError(requestError.message || 'No fue posible eliminar la mascota.');
    } finally {
      setEliminando(null);
    }
  };

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

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {cargando && <p role="status">Cargando mascotas...</p>}
      {!cargando && !error && mascotas.length === 0 && (
        <p className="text-secondary">Aún no tienes mascotas registradas.</p>
      )}

      <div className="row g-4">
        {mascotas.map((m) => (
          <div key={m.id} className="col-md-6">
            <div className={`card overflow-hidden shadow-sm ${cardClass}`}>
              <div className="row g-0">
                <div className="col-sm-5 position-relative">
                  <img
                    src={m.imagen || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80'}
                    alt={m.nombre}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover', minHeight: '180px' }}
                  />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    {m.tipo || m.especie || 'Mascota'}
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
                      {(Array.isArray(m.vacunas) ? m.vacunas : []).map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>

                    <h4 className="h6 text-info fw-bold mb-1">📋 Historial</h4>
                    <ul className="small text-secondary ps-3 m-0">
                      {(Array.isArray(m.historial) ? m.historial : []).map((h, i) => (
                        <li key={i}>{h.detalle} ({h.fecha})</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm mt-3"
                      disabled={eliminando === m.id}
                      onClick={() => eliminarMascota(m.id)}
                    >
                      {eliminando === m.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
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