import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { validarLogin } from '../utils/validaciones.js';

export default function Login() {
  const { login, darkMode } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errores, setErrores] = useState({});
  const [errorAuth, setErrorAuth] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errores && errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validarLogin(formData) || {};
    setErrores(errs);

    if (Object.keys(errs).length === 0) {
      const exito = login(formData.email, formData.password);
      if (exito) {
        navigate('/');
      } else {
        setErrorAuth('Credenciales inválidas. Verifica tu correo y contraseña.');
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className={`card shadow-sm border-0 ${
              darkMode ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'
            }`}
          >
            <div className="card-body p-4">
              <h2 className="card-title text-center fw-bold mb-4 text-primary">
                Iniciar Sesión
              </h2>

              {errorAuth && (
                <div className="alert alert-danger py-2 fs-6" role="alert">
                  {errorAuth}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
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
                    placeholder="admin@vetsm.cl"
                  />
                  {errores?.email && (
                    <div className="invalid-feedback d-block">{errores.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      darkMode ? 'bg-secondary text-white border-secondary' : ''
                    } ${errores?.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  {errores?.password && (
                    <div className="invalid-feedback d-block">{errores.password}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}