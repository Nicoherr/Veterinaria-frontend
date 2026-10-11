import React, { useState } from 'react';
import { validarContacto } from '../utils/validaciones';

export default function Contacto({ darkMode }) {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarContacto(formData);
    setErrors(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setSubmitted(true);
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    }
  };

  return (
    <div className="container py-2" style={{ maxWidth: '850px' }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Contacto</h1>
        <p className="text-secondary">Ponte en contacto con el equipo de VetSM.</p>
      </div>

      {submitted && (
        <div className="alert alert-success alert-dismissible fade show text-center fw-semibold mb-4" role="alert">
          ✅ ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
          <button type="button" className="btn-close" onClick={() => setSubmitted(false)} aria-label="Close"></button>
        </div>
      )}

      <div className={`card p-4 shadow ${cardClass}`}>
        <form onSubmit={handleSubmit} className="row g-3">
          
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre Completo *</label>
            <input
              type="text"
              name="nombre"
              className={`form-control ${errors.nombre ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="Ej. María González"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Teléfono *</label>
            <input
              type="tel"
              name="telefono"
              className={`form-control ${errors.telefono ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="Ej. 987654321"
              value={formData.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Correo Electrónico *</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="correo@ejemplo.cl"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Asunto *</label>
            <input
              type="text"
              name="asunto"
              className={`form-control ${errors.asunto ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="Consulta médica / Cita"
              value={formData.asunto}
              onChange={handleChange}
            />
            {errors.asunto && <div className="invalid-feedback">{errors.asunto}</div>}
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Mensaje *</label>
            <textarea
              name="mensaje"
              rows="4"
              className={`form-control ${errors.mensaje ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="Escribe los detalles de tu consulta..."
              value={formData.mensaje}
              onChange={handleChange}
            ></textarea>
            {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
              Enviar Mensaje
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}