import React, { useState } from 'react';

export default function Citas({ darkMode }) {
  const [agendado, setAgendado] = useState(false);
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setAgendado(true);
  };

  return (
    <div className="container py-2" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">📅 Reserva de Citas Médicas</h1>
        <p className="text-secondary">Selecciona el día y hora para la atención de tu mascota.</p>
      </div>

      {agendado && (
        <div className="alert alert-success text-center fw-semibold mb-4" role="alert">
          🎉 ¡Cita agendada exitosamente! Recibirás un correo de confirmación.
        </div>
      )}

      <div className={`card p-4 shadow ${cardClass}`}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre de la Mascota *</label>
            <input type="text" required className={`form-control ${inputClass}`} placeholder="Ej. Max" />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Especie / Tipo *</label>
            <select className={`form-select ${inputClass}`} required defaultValue="">
              <option value="" disabled>Selecciona...</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Exótico / Otro</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Fecha de Consulta *</label>
            <input type="date" required className={`form-control ${inputClass}`} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Hora de Atención *</label>
            <input type="time" required className={`form-control ${inputClass}`} />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Motivo de la Consulta</label>
            <textarea rows="3" className={`form-control ${inputClass}`} placeholder="Describa el motivo o síntomas..."></textarea>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}