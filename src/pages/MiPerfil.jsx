import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

export default function MiPerfil({ darkMode }) {
  const { user } = useAuth();

  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';
  const datos = {
    nombre: user?.nombre || user?.name || '',
    rut: user?.rut || '',
    email: user?.email || '',
    telefono: user?.telefono || user?.phone || '',
    direccion: user?.direccion || user?.address || '',
  };

  return (
    <div className="container py-2" style={{ maxWidth: '750px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">👤 Mis Datos Personales</h1>
          <p className="text-secondary m-0">Información del tutor y datos de contacto.</p>
        </div>
      </div>

      <div className={`card p-4 shadow ${cardClass}`}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre Completo</label>
            <input
              type="text"
              className={`form-control ${inputClass}`}
              value={datos.nombre}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">RUT</label>
            <input
              type="text"
              className={`form-control ${inputClass}`}
              value={datos.rut}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${inputClass}`}
              value={datos.email}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Teléfono de Contacto</label>
            <input
              type="text"
              className={`form-control ${inputClass}`}
              value={datos.telefono}
              readOnly
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Dirección de Residencia</label>
            <input
              type="text"
              className={`form-control ${inputClass}`}
              value={datos.direccion}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}