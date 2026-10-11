import React, { useState } from 'react';
import { validarContacto } from '../utils/validaciones.js';
import { useAuth } from '../hooks/useAuth.jsx';

export default function Contacto() {
  const { darkMode } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpia el error del campo a medida que el usuario escribe
    if (errores && errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validarContacto(formData) || {};
    setErrores(errs);

    if (Object.keys(errs).length === 0) {
      setEnviado(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
      });
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className={`card shadow-sm border-0 ${
              darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'
            }`}
          >
            <div className="card-body p-4">
              <h2 className="card-title text-center fw-bold mb-4 text-primary">
                Contacto VetSM
              </h2>

              {enviado && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEnviado(false)}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-semibold">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      darkMode ? 'bg-secondary text-white border-secondary' : ''
                    } ${errores?.nombre ? 'is-invalid' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                  />
                  {errores?.nombre && (
                    <div className="invalid-feedback d-block">{errores.nombre}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      darkMode ? 'bg-secondary text-white border-secondary' : ''
                    } ${errores?.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@vetsm.cl"
                  />
                  {errores?.email && (
                    <div className="invalid-feedback d-block">{errores.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label fw-semibold">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${
                      darkMode ? 'bg-secondary text-white border-secondary' : ''
                    } ${errores?.telefono ? 'is-invalid' : ''}`}
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+56912345678"
                  />
                  {errores?.telefono && (
                    <div className="invalid-feedback d-block">{errores.telefono}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label fw-semibold">
                    Mensaje o Consulta
                  </label>
                  <textarea
                    className={`form-control ${
                      darkMode ? 'bg-secondary text-white border-secondary' : ''
                    } ${errores?.mensaje ? 'is-invalid' : ''}`}
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                  {errores?.mensaje && (
                    <div className="invalid-feedback d-block">{errores.mensaje}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}