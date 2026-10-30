import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../services/api.js';

const initialForm = {
  mascotaId: '',
  fecha: '',
  hora: '',
  motivo: '',
};

const getTodayDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
};

export default function Citas({ darkMode }) {
  const [citas, setCitas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [cargando, setCargando] = useState(true);
  const [cargandoMascotas, setCargandoMascotas] = useState(true);
  const [errorMascotas, setErrorMascotas] = useState('');
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
        if (active) setErrorMascotas(requestError.message || 'No fue posible cargar tus mascotas.');
      })
      .finally(() => {
        if (active) setCargandoMascotas(false);
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
        body: JSON.stringify({
          ...formData,
          mascotaId: Number(formData.mascotaId),
        }),
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
          {errorMascotas && (
            <div className="col-12">
              <p className="alert alert-danger mb-0" role="alert">{errorMascotas}</p>
            </div>
          )}
          <div className="col-md-6">
            <label htmlFor="mascotaId" className="form-label fw-semibold">Mascota *</label>
            <select
              id="mascotaId"
              name="mascotaId"
              className={`form-select ${inputClass}`}
              required
              value={formData.mascotaId}
              onChange={handleChange}
              disabled={mascotas.length === 0}
            >
              <option value="" disabled>
                {cargandoMascotas ? 'Cargando mascotas...' : 'Selecciona tu mascota'}
              </option>
              {mascotas.map((mascota) => (
                <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="fecha" className="form-label fw-semibold">Fecha de Consulta *</label>
            <input id="fecha" name="fecha" type="date" min={getTodayDate()} required value={formData.fecha} onChange={handleChange} className={`form-control ${inputClass}`} />
          </div>

          <div className="col-md-6">
            <label htmlFor="hora" className="form-label fw-semibold">Hora de Atención *</label>
            <input id="hora" name="hora" type="time" required value={formData.hora} onChange={handleChange} className={`form-control ${inputClass}`} />
          </div>

          <div className="col-12">
            <label htmlFor="motivo" className="form-label fw-semibold">Motivo de la Consulta</label>
            <textarea id="motivo" name="motivo" rows="3" maxLength={500} value={formData.motivo} onChange={handleChange} className={`form-control ${inputClass}`} placeholder="Describa el motivo o síntomas..." />
          </div>

          <div className="col-12 mt-4">
            {!cargandoMascotas && !errorMascotas && mascotas.length === 0 && (
              <p className="alert alert-info" role="status">
                Primero registra una mascota para poder agendar una cita.{' '}
                <Link to="/mascotas/nueva">Registrar mascota</Link>
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={enviando || cargandoMascotas || mascotas.length === 0}
            >
              {enviando ? 'Agendando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>

      <section className="mt-5" aria-labelledby="citas-title">
        <h2 id="citas-title" className="h4 fw-bold">Mis citas</h2>
        {cargando && <p role="status">Cargando citas...</p>}
        {!cargando && !error && citas.length === 0 && <p className="text-secondary">No tienes citas agendadas.</p>}
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
