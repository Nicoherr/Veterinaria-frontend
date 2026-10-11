import React, { useState, useEffect } from 'react';

export default function MiPerfil({ darkMode }) {
  const [datos, setDatos] = useState(() => {
    const guardados = localStorage.getItem('vetsm_perfil');
    return guardados
      ? JSON.parse(guardados)
      : {
          nombre: 'Ana María Silva',
          rut: '18.765.432-1',
          email: 'ana.silva@gmail.com',
          telefono: '+56 9 8765 4321',
          direccion: 'Av. Providencia 1234, Depto 502, Santiago'
        };
  });

  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('vetsm_perfil', JSON.stringify(datos));
    setEditando(false);
    setMensaje('✅ Datos personales actualizados correctamente.');
    setTimeout(() => setMensaje(''), 4000);
  };

  return (
    <div className="container py-2" style={{ maxWidth: '750px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-primary mb-1">👤 Mis Datos Personales</h1>
          <p className="text-secondary m-0">Información del tutor y datos de contacto.</p>
        </div>
        {!editando && (
          <button className="btn btn-outline-primary fw-semibold" onClick={() => setEditando(true)}>
            ✏️ Editar Perfil
          </button>
        )}
      </div>

      {mensaje && (
        <div className="alert alert-success alert-dismissible fade show fw-semibold" role="alert">
          {mensaje}
        </div>
      )}

      <div className={`card p-4 shadow ${cardClass}`}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              disabled={!editando}
              className={`form-control ${inputClass}`}
              value={datos.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">RUT</label>
            <input
              type="text"
              name="rut"
              disabled={!editando}
              className={`form-control ${inputClass}`}
              value={datos.rut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              disabled={!editando}
              className={`form-control ${inputClass}`}
              value={datos.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Teléfono de Contacto</label>
            <input
              type="text"
              name="telefono"
              disabled={!editando}
              className={`form-control ${inputClass}`}
              value={datos.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Dirección de Residencia</label>
            <input
              type="text"
              name="direccion"
              disabled={!editando}
              className={`form-control ${inputClass}`}
              value={datos.direccion}
              onChange={handleChange}
              required
            />
          </div>

          {editando && (
            <div className="col-12 d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary fw-bold px-4">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}