import React, { useState } from 'react';
import { validarLogin } from '../utils/validaciones';

export default function Login({ onLogin, darkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const cardClass = darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark border-light-subtle';
  const inputClass = darkMode ? 'bg-secondary text-white border-secondary' : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarLogin({ email, password });
    setErrors(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      onLogin();
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '450px' }}>
      <div className={`card p-4 shadow ${cardClass}`}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold text-primary">🐾 Iniciar Sesión</h1>
          <p className="text-secondary small">Accede al portal privado de VetSM</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="cliente@vetsm.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''} ${inputClass}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Ingresar al Sistema
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-secondary">
            Prueba de acceso directo: puedes presionar "Ingresar" completando datos válidos.
          </small>
        </div>
      </div>
    </div>
  );
}