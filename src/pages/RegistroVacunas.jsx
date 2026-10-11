import React, { useState } from 'react';

export default function RegistroVacunas({ darkMode }) {
  const [registrado, setRegistrado] = useState(false);
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrado(true);
  };

  return (
    <div className="container py-2" style={{ maxWidth: '750px' }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">💉 Registro de Vacunas y Desparasitaciones</h1>
        <p className="text-secondary">Ingreso de dosis aplicadas al expediente del paciente.</p>
      </div>

      {registrado && (
        <div className="alert alert-success text-center fw-semibold mb-4" role="alert">
          ✅ ¡Inmunización registrada con éxito en el historial clínico!
        </div>
      )}

      <div className={`card p-4 shadow ${cardClass}`}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre de la Mascota *</label>
            <input type="text" required className={`form-control ${inputClass}`} placeholder="Ej. Luna" />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Tipo de Vacuna / Producto *</label>
            <select className={`form-select ${inputClass}`} required defaultValue="">
              <option value="" disabled>Selecciona...</option>
              <option value="octuple">Óctuple Canina</option>
              <option value="antirrabica">Antirrábica</option>
              <option value="triple_felina">Triple Felina</option>
              <option value="desparasitante">Desparasitante Interno</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Fecha de Aplicación *</label>
            <input type="date" required className={`form-control ${inputClass}`} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Próxima Dosis Sugerida</label>
            <input type="date" className={`form-control ${inputClass}`} />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Veterinario Responsable</label>
            <input type="text" className={`form-control ${inputClass}`} placeholder="Ej. Dr. Gómez" />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Guardar en Ficha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}