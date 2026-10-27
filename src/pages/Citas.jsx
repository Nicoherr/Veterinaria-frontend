import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api.js';

const initialForm = {
  nombreMascota: '',
  tipo: '',
  fecha: '',
  hora: '',
  motivo: '',
};

export default function Citas({ darkMode }) {
  const [citas, setCitas] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [eliminando, setEliminando] = useState(null);
  const [error, setError] = useState('');
  const [agendado, setAgendado] = useState(false);
  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  useEffect(() => {
    let active = true;
    apiFetch('/citas')
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.content ?? data?.data ?? data?.citas;
        if (!Array.isArray(items)) {
          throw new Error('La respuesta del servidor no contiene una lista de citas.');
        }
        if (active) setCitas(items);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'No fue posible cargar las citas.');
      })
      .finally(() => {
        if (active) setCargando(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (event) => {
    setFormData((actual) => ({ ...actual, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEnviando(true);
    setError('');
    setAgendado(false);
    try {
      await apiFetch('/citas', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setFormData(initialForm);
      setAgendado(true);
      try {
        const data = await apiFetch('/citas');
        const items = Array.isArray(data) ? data : data?.content ?? data?.data ?? data?.citas;
        if (!Array.isArray(items)) {
          throw new Error('La respuesta del servidor no contiene una lista de citas.');
        }
        setCitas(items);
      } catch (refreshError) {
        setError(`La cita se creó, pero no se pudo actualizar la lista: ${refreshError.message}`);
      }
    } catch (requestError) {
      setError(requestError.message || 'No fue posible agendar la cita.');
    } finally {
      setEnviando(false);
    }
  };

  const eliminarCita = async (id) => {
    setEliminando(id);
    setError('');
    try {
      await apiFetch(`/citas/${id}`, { method: 'DELETE' });
      setCitas((actuales) => actuales.filter((cita) => cita.id !== id));
    } catch (requestError) {
      setError(requestError.message || 'No fue posible eliminar la cita.');
    } finally {
      setEliminando(null);
    }
  };

  return (
    <div className="container py-2" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">📅 Reserva de Citas Médicas</h1>
        <p className="text-secondary">Selecciona el día y hora para la atención de tu mascota.</p>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {agendado && (
        <div className="alert alert-success text-center fw-semibold mb-4" role="alert">
          🎉 ¡Cita agendada exitosamente!
        </div>
      )}

      <div className={`card p-4 shadow ${cardClass}`}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombreMascota" className="form-label fw-semibold">Nombre de la Mascota *</label>
            <input id="nombreMascota" name="nombreMascota" type="text" required value={formData.nombreMascota} onChange={handleChange} className={`form-control ${inputClass}`} placeholder="Ej. Max" />
          </div>

          <div className="col-md-6">
            <label htmlFor="tipo" className="form-label fw-semibold">Especie / Tipo *</label>
            <select id="tipo" name="tipo" className={`form-select ${inputClass}`} required value={formData.tipo} onChange={handleChange}>
              <option value="" disabled>Selecciona...</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Exótico / Otro</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="fecha" className="form-label fw-semibold">Fecha de Consulta *</label>
            <input id="fecha" name="fecha" type="date" required value={formData.fecha} onChange={handleChange} className={`form-control ${inputClass}`} />
          </div>

          <div className="col-md-6">
            <label htmlFor="hora" className="form-label fw-semibold">Hora de Atención *</label>
            <input id="hora" name="hora" type="time" required value={formData.hora} onChange={handleChange} className={`form-control ${inputClass}`} />
          </div>

          <div className="col-12">
            <label htmlFor="motivo" className="form-label fw-semibold">Motivo de la Consulta</label>
            <textarea id="motivo" name="motivo" rows="3" value={formData.motivo} onChange={handleChange} className={`form-control ${inputClass}`} placeholder="Describa el motivo o síntomas..." />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={enviando}>
              {enviando ? 'Agendando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>

      <section className="mt-5" aria-labelledby="citas-title">
        <h2 id="citas-title" className="h4 fw-bold">Mis citas</h2>
        {cargando && <p role="status">Cargando citas...</p>}
        {!cargando && citas.length === 0 && <p className="text-secondary">No tienes citas agendadas.</p>}
        <div className="d-grid gap-3">
          {citas.map((cita) => (
            <article key={cita.id} className={`card p-3 ${cardClass}`}>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3 className="h6 fw-bold">{cita.nombreMascota || cita.mascota?.nombre || cita.mascota || 'Mascota'}</h3>
                  <p className="mb-1 text-secondary">{cita.fecha || ''} {cita.hora || ''}</p>
                  {cita.motivo && <p className="mb-0">{cita.motivo}</p>}
                </div>
                {cita.id != null && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    disabled={eliminando === cita.id}
                    onClick={() => eliminarCita(cita.id)}
                  >
                    {eliminando === cita.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
